import axios, { Axios } from "axios";
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
    Position,
    ProviderPosition,
} from "../../types/types";

abstract class BrokerageProvider {
    // General props
    protected axios: Axios;

    // Headers
    protected defaultHeaders = {
        accept: "application/json",
    };
    protected abstract providerCommonHeaders: object;

    // URI values
    protected abstract devAPIDomain: string;
    protected abstract prodAPIDomain: string;
    protected abstract securitiesPath: string;
    protected abstract buyPath: string;
    protected abstract sellPath: string;
    protected abstract historicalPriceDataURIPath: string;
    protected abstract liquidatePath: string;
    protected abstract positionsPath: string;

    // Query string params
    protected securitiesQueryStringParams = "";
    protected buyQueryStringParams = "";
    protected sellQueryStringParams = "";
    protected historicalPriceDataQueryStringParams = "";
    protected positionsQueryStringParams = "";

    // Abstract helper methods
    protected abstract convertBuyOrderToRequestData(buyOrder: BuyOrder): object;
    protected abstract convertSellOrderToRequestData(sellOrder: SellOrder): object;
    protected abstract convertToSecurity(security: ProviderSecurity): Security;
    protected abstract convertToBuyResult(buyResult: ProviderBuyResult): BuyResult;
    protected abstract convertToSellResult(sellResult: ProviderSellResult): SellResult;
    protected abstract convertToPriceData(priceData: ProviderPriceData): PriceData;
    protected abstract convertToPosition(position: ProviderPosition): Position;

    constructor() {
        this.axios = axios;
    }

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

    protected convertToPositionsArray(positions: ProviderPosition[]): Position[] {
        return positions.map((position: ProviderPosition) => this.convertToPosition(position));
    }

    // URI methods
    protected getSecuritiesUri(): string {
        const domain = this.isLive() ? this.prodAPIDomain : this.devAPIDomain;
        return `${domain}${this.securitiesPath}`;
    }

    protected getBuyUri(): string {
        const domain = this.isLive() ? this.prodAPIDomain : this.devAPIDomain;
        return `${domain}${this.buyPath}`;
    }

    protected getSellUri(): string {
        const domain = this.isLive() ? this.prodAPIDomain : this.devAPIDomain;
        return `${domain}${this.sellPath}`;
    }

    protected getHistoricalPriceDataUri(): string {
        const domain = this.isLive() ? this.prodAPIDomain : this.devAPIDomain;
        return `${domain}${this.historicalPriceDataURIPath}`;
    }

    protected getLiquidateUri(): string {
        const domain = this.isLive() ? this.prodAPIDomain : this.devAPIDomain;
        return `${domain}${this.liquidatePath}`;
    }

    protected getPositionsUri(): string {
        const domain = this.isLive() ? this.prodAPIDomain : this.devAPIDomain;
        return `${domain}${this.positionsPath}`;
    }

    // Query string params methods
    protected getSecuritiesQueryStringParams(): string {
        return this.securitiesQueryStringParams;
    }

    protected getBuyQueryStringParams(buyOrder: BuyOrder): string {
        console.log(buyOrder);
        return this.buyQueryStringParams;
    }

    protected getSellQueryStringParams(sellOrder: SellOrder): string {
        console.log(sellOrder);
        return this.sellQueryStringParams;
    }

    protected getHistoricalPriceDataQueryStringParams(priceDataRequestParams: HistoricalPriceDataRequestParams): string {
        console.log(priceDataRequestParams);
        return this.historicalPriceDataQueryStringParams;
    }

    protected getPositionsQueryStringParams(): string {
        return this.positionsQueryStringParams;
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

    protected getLiquidateHeaders(): object {
        return this.getRequestHeaders();
    }

    protected getPositionsHeaders(): object {
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
        const securitiesURI = `${this.getSecuritiesUri()}?${this.getSecuritiesQueryStringParams()}`;
        const headers = this.getSecuritiesHeaders();
        const response = await axios.get(securitiesURI, { headers });
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
        // Setup
        const buyURI = `${this.getBuyUri()}?${this.getBuyQueryStringParams(buyOrder)}`;
        const requestData = this.convertBuyOrderToRequestData(buyOrder);
        const headers = this.getBuyHeaders();

        // Request
        const response = await axios.post(buyURI, requestData, { headers });

        // Return
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
        // Setup
        const sellURI = `${this.getSellUri()}?${this.getSellQueryStringParams(sellOrder)}`;
        const requestData = this.convertSellOrderToRequestData(sellOrder);
        const headers = this.getSellHeaders();

        // Request
        const response = await axios.post(sellURI, requestData, { headers });

        // Return
        console.log("sell response: ", response.data);
        return this.convertToSellResult(response.data);
    }

    /**
     * Retrieves historical price data from the brokerage provider for a given symbol.
     *
     * TODO: Write a generic implementation of this. Making this an abstract method for now,
     * as Alpaca's implementation involves a loop that makes multiple requests to the API.
     *
     * @param priceDataParams The parameters for the historical price data request
     * @returns {Promise<PriceData[]>} A promise that resolves to an array of PriceData objects
     */
    public abstract historicalPriceData(priceDataParams: HistoricalPriceDataRequestParams): Promise<PriceData[]>;

    /**
     * Liquidates all shares of a security hwld in the brokerage account.
     *
     * TODO: Write a generic implementation of this
     *
     * @param symbol The symbol of the security to liquidate
     * @returns {Promise<SellResult>} A promise that resolves to a SellResult object
     */
    public abstract liquidate(symbol: string): Promise<SellResult>;

    /**
     * Retrieves a list of positions held in the brokerage account.
     *
     * @returns {Promise<Position[]>} A promise that resolves to an array of Security objects
     */
    public async positions(): Promise<Position[]> {
        // Setup
        const positionsURI = `${this.getPositionsUri()}?${this.getPositionsQueryStringParams()}}`;
        const headers = this.getPositionsHeaders();

        // Request
        const response = await axios.get(positionsURI, { headers });

        // Transform
        const positions: Position[] = this.convertToPositionsArray(response.data);

        // Return
        return positions;
    }
}

export default BrokerageProvider;
