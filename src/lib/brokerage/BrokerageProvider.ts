import axios, { AxiosResponse } from "axios";
import {
    BuyResult,
    ProviderBuyResult,
    ProviderSecurity,
    RestMethods,
    Security,
    BuyOrder,
    SellOrder,
    SellResult,
    ProviderSellResult,
} from "../../types/types";
import config from "../../config";

abstract class BrokerageProvider {
    // Headers
    protected defaultHeaders = {
        accept: "application/json",
    };
    protected abstract providerCommonHeaders: object;

    // URI values
    protected abstract devAPIDomain: string;
    protected abstract prodAPIDomain: string;
    protected abstract securitiesEndpoint: string;
    protected abstract buyEndpoint: string;

    // Query string params
    protected securitiesQueryStringParams = "";
    protected buyQueryStringParams = "";

    // Helper methods
    protected abstract convertToSecurity(security: ProviderSecurity): Security;
    protected abstract convertToBuyResult(buyResult: ProviderBuyResult): BuyResult;
    protected abstract convertToSellResult(buyResult: ProviderSellResult): SellResult;
    protected convertToSecuritiesArray(securities: ProviderSecurity[]): Security[] {
        return securities.map((security: ProviderSecurity) => this.convertToSecurity(security));
    }

    protected getAPIDomain(): string {
        console.log("config.ENV: ", config.ENV);
        if (config.ENV == "production") {
            return this.prodAPIDomain;
        } else {
            return this.devAPIDomain;
        }
    }

    public async securities(): Promise<Security[]> {
        const securitiesURI = `${this.getAPIDomain()}${this.securitiesEndpoint}?${this.securitiesQueryStringParams}`;
        const response = await axios.get(securitiesURI, {
            headers: {
                ...this.defaultHeaders,
                ...this.providerCommonHeaders,
            },
        });
        console.log(response.data);
        return this.convertToSecuritiesArray(response.data);
    }

    public async buy(buyOrder: BuyOrder): Promise<BuyResult> {
        const buyURI = `${this.getAPIDomain()}${this.buyEndpoint}?${this.buyQueryStringParams}`;
        const response = await axios.post(buyURI, {
            side: "buy",
            type: "market",
            time_in_force: "gtc",
            symbol: buyOrder.symbol,
            notional: buyOrder.notional,
            qty: buyOrder.qty,
        }, {
            headers: {
                ...this.defaultHeaders,
                ...this.providerCommonHeaders,
            },
        });
        console.log(response.data);
        return this.convertToBuyResult(response.data);
    }

    public async sell(sellOrder: SellOrder): Promise<SellResult> {
        const sellURI = `${this.getAPIDomain()}${this.buyEndpoint}?${this.buyQueryStringParams}`;
        const response = await axios.post(sellURI, {
            side: "sell",
            type: "market",
            time_in_force: "gtc",
            symbol: sellOrder.symbol,
            notional: sellOrder.notional,
            qty: sellOrder.qty,
        }, {
            headers: {
                ...this.defaultHeaders,
                ...this.providerCommonHeaders,
            },
        });
        console.log(response.data);
        return this.convertToSellResult(response.data);
    }
}

export default BrokerageProvider;
