import {
    BuyResult,
    ProviderBuyResult,
    ProviderSecurity,
    RestMethods,
    Security,
} from "../../types/types";

abstract class BrokerageProvider {
    protected defaultHeaders = {
        accept: "application/json",
    };
    protected abstract devAPIDomain: string;
    protected abstract prodAPIDomain: string;
    protected abstract providerCommonHeaders: object;
    protected abstract securitiesEndpoint: string;
    protected securitiesQueryStringParams = "";
    protected abstract buyEndpoint: string;
    protected buyQueryStringParams = "";

    // TODO: Remove explicit anys
    protected abstract convertToBuyResult(params: ProviderBuyResult): BuyResult;
    protected abstract convertToSecurity(params: ProviderSecurity): Security;
    protected abstract convertToSecuritiesArray(params:ProviderSecurity[]): Security[];

    protected getAPIDomain(): string {
        if (process.env.env == "production") {
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

    public buy(): Promise<BuyResult> {
        return new Promise((resolve, reject) => {
            const buyURI = `${this.getAPIDomain()}${this.buyEndpoint}?${this.buyQueryStringParams}`;
            fetch(buyURI, {
                method: RestMethods.POST,
                headers: {
                    ...this.defaultHeaders,
                    ...this.providerCommonHeaders,
                },
            })
                .then((resp: Response) => resp.json())
                .then(resp => resolve(this.convertToBuyResult(resp)))
                .catch((err: Error) => reject(err));
        });
    }
}

export default BrokerageProvider;
