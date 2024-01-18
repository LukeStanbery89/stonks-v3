import config from "../../../config";
import {
    AlpacaBuyResult,
    AlpacaPosition,
    AlpacaPriceData,
    AlpacaSecurity,
    AlpacaSellResult,
    BuyOrder,
    BuyResult,
    HistoricalPriceDataRequestParams,
    OrderType,
    Position,
    PriceData,
    Security,
    SellOrder,
    SellResult,
} from "../../../types/types";
import BrokerageProvider from "../BrokerageProvider";

class AlpacaProvider extends BrokerageProvider {
    // Headers
    protected providerCommonHeaders: object = {
        "APCA-API-KEY-ID": config.APCA_API_KEY_ID,
        "APCA-API-SECRET-KEY": config.APCA_API_SECRET_KEY,
    };

    // URI values
    protected devAPIDomain = "https://paper-api.alpaca.markets";
    protected prodAPIDomain = "https://api.alpaca.markets";
    private marketDataURI = "https://data.alpaca.markets";

    protected securitiesPath = "/v2/assets";
    protected buyPath = "/v2/orders";
    protected sellPath = "/v2/orders";
    protected historicalPriceDataURIPath = "/v1beta3/crypto/us/bars";
    protected positionsPath = "/v2/positions";
    protected positionPath = this.positionsPath;
    protected liquidatePath = this.positionsPath;

    private HISTORICAL_PRICE_DATA_TIME_FRAME = "1Min";
    private DEFAULT_LIMIT = 1000;

    // Query string params
    protected securitiesQueryStringParams: string = new URLSearchParams({
        status: "active",
        asset_class: "crypto",
    }).toString();

    constructor() {
        super();
    }

    /*********************
     * Protected Methods *
     *********************/

    // Conversion methods
    protected convertBuyOrderToRequestData(buyOrder: BuyOrder): object {
        return {
            side: "buy",
            type: "market",
            time_in_force: "gtc",
            symbol: buyOrder.symbol,
            notional: buyOrder.notional,
            qty: buyOrder.qty,
        };
    }

    protected convertSellOrderToRequestData(sellOrder: SellOrder): object {
        return {
            side: "sell",
            type: "market",
            time_in_force: "gtc",
            symbol: sellOrder.symbol,
            notional: sellOrder.notional,
            qty: sellOrder.qty,
        };
    }

    protected convertToSecurity(security: AlpacaSecurity): Security {
        return {
            symbol: security.symbol,
            name: security.name,
        };
    }

    protected convertToBuyResult(buyResult: AlpacaBuyResult): BuyResult {
        return {
            type: OrderType.BUY,
            symbol: buyResult.symbol,
            notional: buyResult.notional ? parseFloat(buyResult.notional.toString()) : null,
            qty: buyResult.qty ? parseFloat(buyResult.qty.toString()) : null,
        };
    }

    protected convertToSellResult(sellResult: AlpacaSellResult): SellResult {
        return {
            type: OrderType.SELL,
            symbol: sellResult.symbol,
            notional: sellResult.notional ? parseFloat(sellResult.notional.toString()) : null,
            qty: sellResult.qty ? parseFloat(sellResult.qty.toString()) : null,
        };
    }

    protected convertToPriceData(priceData: AlpacaPriceData): PriceData {
        return {
            timestamp: priceData.t,
            open: priceData.o,
            high: priceData.h,
            low: priceData.l,
            close: priceData.c,
            volume: priceData.v,
        };
    }

    protected convertToPosition(position: AlpacaPosition): Position {
        return {
            symbol: position.symbol,
            qty: parseFloat(position.qty_available.toString()),
        };
    }

    // Header methods
    protected getLiquidateHeaders(): object {
        return this.getPositionsHeaders();
    }

    // URI methods
    protected getHistoricalPriceDataUri(): string {
        return `${this.marketDataURI}${this.historicalPriceDataURIPath}`;
    }

    // Query param methods
    protected getHistoricalPriceDataQueryStringParams(priceDataParams: HistoricalPriceDataRequestParams): string {
        return new URLSearchParams({
            symbols: priceDataParams.symbol,
            start: priceDataParams.start,
            end: priceDataParams.end,
            limit: (priceDataParams.limit || this.DEFAULT_LIMIT).toString(),
            timeframe: this.HISTORICAL_PRICE_DATA_TIME_FRAME,
        }).toString();
    }

    /******************
     * Public Methods *
     ******************/

    public async historicalPriceData(priceDataParams: HistoricalPriceDataRequestParams): Promise<PriceData[]> {
        const historicalPriceDataURI = `${this.getHistoricalPriceDataUri()}?${this.getHistoricalPriceDataQueryStringParams(priceDataParams)}`;
        let morePages = true;
        let pageToken = "";
        const priceData = [];

        while(morePages) {
            // Request
            const response = await this.axios.get(historicalPriceDataURI, {
                headers: this.getHistoricalPriceDataHeaders(),
                data: {
                    ...priceDataParams,
                    timeframe: this.HISTORICAL_PRICE_DATA_TIME_FRAME,
                    page_token: pageToken,
                },
            });
            console.log("historicalPriceData response", JSON.stringify(response.data));

            // Transform
            priceData.push(...this.convertToPriceDataArray(response.data.bars[priceDataParams.symbol]));

            // Update loop variables
            if (response.data.next_page_token) {
                pageToken = response.data.next_page_token;
            } else {
                morePages = false;
            }
        }

        return priceData;
    }
}

export default AlpacaProvider;
