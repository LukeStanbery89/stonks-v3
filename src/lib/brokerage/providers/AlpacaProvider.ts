import config from "../../../config";
import {
    AlpacaBuyResult,
    AlpacaPriceData,
    AlpacaSecurity,
    AlpacaSellResult,
    BuyResult,
    HistoricalPriceDataRequestParams,
    OrderType,
    PriceData,
    Security,
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

    protected securitiesEndpoint = "/v2/assets";
    protected buyEndpoint = "/v2/orders";
    protected historicalPriceDataURIPath = "/v1beta3/crypto/us/bars";
    private historicalPriceDataTimeframe = "1Min";

    // Query string params
    protected securitiesQueryStringParams: string = new URLSearchParams({
        status: "active",
        asset_class: "crypto",
    }).toString();

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
            notional: buyResult.notional,
            qty: buyResult.qty,
        };
    }

    protected convertToSellResult(sellResult: AlpacaSellResult): SellResult {
        return {
            type: OrderType.SELL,
            symbol: sellResult.symbol,
            notional: sellResult.notional,
            qty: sellResult.qty,
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

    protected getHistoricalPriceDataUri(): string {
        return `${this.marketDataURI}${this.historicalPriceDataURIPath}`;
    }

    protected getHistoricalPriceDataQueryStringParams(priceDataParams: HistoricalPriceDataRequestParams): string {
        return new URLSearchParams({
            symbols: priceDataParams.symbol,
            start: priceDataParams.start,
            end: priceDataParams.end,
            limit: priceDataParams.limit.toString(),
            timeframe: this.historicalPriceDataTimeframe,
        }).toString();
    }
}

export default AlpacaProvider;
