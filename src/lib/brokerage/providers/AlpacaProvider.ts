import {
    AlpacaBuyResult,
    AlpacaPosition,
    AlpacaPriceData,
    AlpacaSecurity,
    AlpacaSellResult,
    BuyOrder,
    BuyResult,
    Config,
    HistoricalPriceDataRequestParams,
    Order,
    OrderType,
    Position,
    PriceData,
    Security,
    SellOrder,
    SellResult,
} from "../../../types/types";
import Logger from "@lukestanbery/ledger";
import { round } from "../../math";
import BrokerageProvider from "../BrokerageProvider";

class AlpacaProvider extends BrokerageProvider {
    // Headers
    protected providerCommonHeaders: object = {
        "APCA-API-KEY-ID": this.config.ALPACA.APCA_API_KEY_ID,
        "APCA-API-SECRET-KEY": this.config.ALPACA.APCA_API_SECRET_KEY,
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

    // Query string params
    protected securitiesQueryStringParams: string = new URLSearchParams({
        status: "active",
        asset_class: "crypto",
    }).toString();

    constructor(config: Config) {
        super(config);
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
            notional: buyResult.notional ? round(buyResult.notional, 2) : null,
            qty: buyResult.qty ? Number(buyResult.qty) : null,
        };
    }

    protected convertToSellResult(sellResult: AlpacaSellResult): SellResult {
        return {
            type: OrderType.SELL,
            symbol: sellResult.symbol,
            notional: sellResult.notional ? round(sellResult.notional, 2) : null,
            qty: sellResult.qty ? Number(sellResult.qty) : null,
        };
    }

    protected convertToPriceData(priceData: AlpacaPriceData): PriceData {
        return {
            timestamp: priceData.t,
            open: round(priceData.o, 2),
            high: round(priceData.h, 2),
            low: round(priceData.l, 2),
            close: round(priceData.c, 2),
            volume: round(priceData.v, 2),
        };
    }

    protected convertToPosition(position: AlpacaPosition): Position {
        return {
            symbol: position.symbol,
            qty: Number(position.qty_available),
        };
    }

    // Helper methods
    public calculateFeesForOrder(order: Order, currentPrice: number): number {
        // Alpaca charges different fees for buy and sell orders
        let feePercentage = 1;
        if (order.type === OrderType.BUY) {
            feePercentage = this.config.ALPACA.BUY_ORDER_FEE_PERCENTAGE;
        } else if (order.type === OrderType.SELL) {
            feePercentage = this.config.ALPACA.SELL_ORDER_FEE_PERCENTAGE;
        }

        // Calculate the net fee
        let netFee = 0;
        if (order.notional) {
            netFee = order.notional * feePercentage;
        } else if (order.qty) {
            netFee = order.qty * currentPrice * feePercentage;
        }

        return netFee;
    }

    protected getPositionSymbol(position: AlpacaPosition): string {
        return position.symbol;
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
            limit: (priceDataParams.limit || this.config.TRADE.DEFAULT_LIMIT).toString(),
            timeframe: this.config.ALPACA.HISTORICAL_PRICE_DATA_TIME_FRAME,
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
                    timeframe: this.config.ALPACA.HISTORICAL_PRICE_DATA_TIME_FRAME,
                    page_token: pageToken,
                },
            });
            Logger.log("historicalPriceData response", JSON.stringify(response.data));

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
