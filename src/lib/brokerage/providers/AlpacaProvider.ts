import config from "../../../config";
import {
    AlpacaBuyResult,
    AlpacaSecurity,
    AlpacaSellResult,
    BuyResult,
    OrderType,
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
    protected securitiesEndpoint = "/v2/assets";
    protected buyEndpoint = "/v2/orders";

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
}

export default AlpacaProvider;
