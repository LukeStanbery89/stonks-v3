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
        if (process.env.NODE_ENV == "production") {
            return this.prodAPIDomain;
        } else {
            return this.devAPIDomain;
        }
    }

    public securities(): Promise<Security[]> {
        return new Promise((resolve, reject) => {
            const securitiesURI = `${this.getAPIDomain()}${this.securitiesEndpoint}?${this.securitiesQueryStringParams}`;
            fetch(securitiesURI, {
                method: RestMethods.GET,
                headers: {
                    ...this.defaultHeaders,
                    ...this.providerCommonHeaders,
                },
            })
                .then((resp: Response) => resp.json())
                .then(resp => resolve(this.convertToSecuritiesArray(resp)))
                .catch((err: Error) => reject(err));
        });
    }

    public buy(buyOrder: BuyOrder): Promise<BuyResult> {
        return new Promise((resolve, reject) => {
            const buyURI = `${this.getAPIDomain()}${this.buyEndpoint}?${this.buyQueryStringParams}`;
            fetch(buyURI, {
                method: RestMethods.POST,
                headers: {
                    ...this.defaultHeaders,
                    ...this.providerCommonHeaders,
                },
                body: JSON.stringify({
                    side: "buy",
                    type: "market",
                    time_in_force: "gtc",
                    symbol: buyOrder.symbol,
                    notional: buyOrder.notional,
                    qty: buyOrder.qty,
                }),
            })
                .then((resp: Response) => resp.json())
                .then((resp: Response) => {
                    console.log(resp);
                    return resp;
                })
                .then(resp => resolve(this.convertToBuyResult(resp)))
                .catch((err: Error) => reject(err));
        });
    }

    public sell(sellOrder: SellOrder): Promise<SellResult> {
        return new Promise((resolve, reject) => {
            const sellURI = `${this.getAPIDomain()}${this.buyEndpoint}?${this.buyQueryStringParams}`;
            fetch(sellURI, {
                method: RestMethods.POST,
                headers: {
                    ...this.defaultHeaders,
                    ...this.providerCommonHeaders,
                },
                body: JSON.stringify({
                    side: "sell",
                    type: "market",
                    time_in_force: "gtc",
                    symbol: sellOrder.symbol,
                    notional: sellOrder.notional,
                    qty: sellOrder.qty,
                }),
            })
                .then((resp: Response) => resp.json())
                .then((resp: Response) => {
                    console.log(resp);
                    return resp;
                })
                .then(resp => resolve(this.convertToSellResult(resp)))
                .catch((err: Error) => reject(err));
        });
    }
}

export default BrokerageProvider;
