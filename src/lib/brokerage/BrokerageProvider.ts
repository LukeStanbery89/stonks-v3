import axios from "axios";
import {
    BuyResult,
    ProviderBuyResult,
    ProviderSecurity,
    Security,
    BuyOrder,
    SellOrder,
    SellResult,
    ProviderSellResult,
    PriceData,
    HistoricalPriceDataRequestParams,
    ProviderPriceData,
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
    protected abstract historicalPriceDataURIPath: string;

    // Query string params
    protected securitiesQueryStringParams = "";
    protected buyQueryStringParams = "";
    protected sellQueryStringParams = "";
    protected historicalPriceDataQueryStringParams = "";

    // Abstract helper methods
    protected abstract convertToSecurity(security: ProviderSecurity): Security;
    protected abstract convertToBuyResult(buyResult: ProviderBuyResult): BuyResult;
    protected abstract convertToSellResult(buyResult: ProviderSellResult): SellResult;
    protected abstract convertToPriceData(priceData: ProviderPriceData): PriceData;

    /*********************
     * Protected Methods *
     *********************/

    // Helper methods
    protected isLive(): boolean {
        return process.env.ENV == "production";
    }

    protected convertToSecuritiesArray(securities: ProviderSecurity[]): Security[] {
        return securities.map((security: ProviderSecurity) => this.convertToSecurity(security));
    }

    protected convertToPriceDataArray(priceData: ProviderPriceData[]): PriceData[] {
        return priceData.map((priceDatum: ProviderPriceData) => this.convertToPriceData(priceDatum));
    }

    // URI methods
    protected getSecuritiesUri(): string {
        const domain = this.isLive() ? this.prodAPIDomain : this.devAPIDomain;
        return `${domain}${this.securitiesEndpoint}`;
    }

    protected getBuyUri(): string {
        const domain = this.isLive() ? this.prodAPIDomain : this.devAPIDomain;
        return `${domain}${this.buyEndpoint}`;
    }

    protected getSellUri(): string {
        const domain = this.isLive() ? this.prodAPIDomain : this.devAPIDomain;
        return `${domain}${this.buyEndpoint}`;
    }

    protected getHistoricalPriceDataUri(): string {
        const domain = this.isLive() ? this.prodAPIDomain : this.devAPIDomain;
        return `${domain}${this.historicalPriceDataURIPath}`;
    }

    protected getHistoricalPriceDataQueryStringParams(priceDataRequestParams: HistoricalPriceDataRequestParams): string {
        return this.historicalPriceDataQueryStringParams;
    }

    // Header methods
    protected getRequestHeaders(): object {
        return {
            ...this.defaultHeaders,
            ...this.providerCommonHeaders,
        };
    }

    protected getSecuritiesHeaders(): object {
        return this.getRequestHeaders();
    }

    protected getBuyHeaders(): object {
        return this.getRequestHeaders();
    }

    protected getSellHeaders(): object {
        return this.getRequestHeaders();
    }

    protected getHistoricalPriceDataHeaders(): object {
        return this.getRequestHeaders();
    }

    /******************
     * Public Methods *
     ******************/

    /**
     * Retrieves a list of tradable securities from the brokerage provider.
     *
     * @returns {Promise<Security[]>} A promise that resolves to an array of Security objects
     */
    public async securities(): Promise<Security[]> {
        const securitiesURI = `${this.getSecuritiesUri()}?${this.securitiesQueryStringParams}`;
        const response = await axios.get(securitiesURI, {
            headers: this.getSecuritiesHeaders(),
        });
        console.log("securities response", response.data);
        return this.convertToSecuritiesArray(response.data);
    }

    /**
     * Submits a buy order to the brokerage provider.
     *
     * @param buyOrder The buy order to submit
     * @returns {Promise<BuyResult>} A promise that resolves to a BuyResult object
     */
    public async buy(buyOrder: BuyOrder): Promise<BuyResult> {
        const buyURI = `${this.getBuyUri()}?${this.buyQueryStringParams}`;
        const response = await axios.post(buyURI, {
            side: "buy",
            type: "market",
            time_in_force: "gtc",
            symbol: buyOrder.symbol,
            notional: buyOrder.notional,
            qty: buyOrder.qty,
        }, {
            headers: this.getBuyHeaders(),
        });
        console.log("buy response: ", response.data);
        return this.convertToBuyResult(response.data);
    }

    /**
     * Submits a sell order to the brokerage provider.
     *
     * @param sellOrder The sell order to submit
     * @returns {Promise<SellResult>} A promise that resolves to a SellResult object
     */
    public async sell(sellOrder: SellOrder): Promise<SellResult> {
        const sellURI = `${this.getSellUri()}?${this.sellQueryStringParams}`;
        const response = await axios.post(sellURI, {
            side: "sell",
            type: "market",
            time_in_force: "gtc",
            symbol: sellOrder.symbol,
            notional: sellOrder.notional,
            qty: sellOrder.qty,
        }, {
            headers: this.getSellHeaders(),
        });
        console.log("sell response: ", response.data);
        return this.convertToSellResult(response.data);
    }

    /**
     * Retrieves historical price data from the brokerage provider for a given symbol.
     *
     * @param priceDataParams The parameters for the historical price data request
     * @returns {Promise<PriceData[]>} A promise that resolves to an array of PriceData objects
     */
    public async historicalPriceData(priceDataParams: HistoricalPriceDataRequestParams): Promise<PriceData[]> {
        const historicalPriceDataURI = `${this.getHistoricalPriceDataUri()}?${this.getHistoricalPriceDataQueryStringParams(priceDataParams)}`;
        let morePages = true;
        let pageToken = "";
        const priceData = [];

        while(morePages) {
            // Request
            const response = await axios.get(historicalPriceDataURI, {
                headers: this.getHistoricalPriceDataHeaders(),
                data: {
                    ...priceDataParams,
                    timeframe: "1Min",
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

export default BrokerageProvider;
