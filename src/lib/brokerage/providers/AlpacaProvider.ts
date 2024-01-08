import config from "../../../config";
import {
    AlpacaBuyResult,
    AlpacaSecurity,
    BuyResult,
    Security,
} from "../../../types/types";
import BrokerageProvider from "../BrokerageProvider";

class AlpacaProvider extends BrokerageProvider {
    protected devAPIDomain = "https://paper-api.alpaca.markets";
    protected prodAPIDomain = "https://api.alpaca.markets";
    protected providerCommonHeaders: object = {
        "APCA-API-KEY-ID": config.APCA_API_KEY_ID,
        "APCA-API-SECRET-KEY": config.APCA_API_SECRET_KEY,
    };
    protected securitiesEndpoint = "/v2/assets";
    protected securitiesQueryStringParams: string = new URLSearchParams({
        status: "active",
        asset_class: "crypto",
    }).toString();
    protected buyEndpoint = "/v2/orders";
    protected buyQueryStringParams: string = new URLSearchParams({
        side: "buy",
        type: "market",
        time_in_force: "gtc",
        symbol: "ETH/USD",
        qty: "1",
    }).toString();

    protected convertToSecurity(security: AlpacaSecurity): Security {
        return {
            symbol: security.symbol,
            name: security.name,
        };
    }

    protected convertToSecuritiesArray(securities: AlpacaSecurity[]): Security[] {
        return securities.map((security: AlpacaSecurity) => this.convertToSecurity(security));
    }

    protected convertToBuyResult(params: AlpacaBuyResult): BuyResult {
        throw new Error("Method not implemented.");
    }

}

export default AlpacaProvider;
