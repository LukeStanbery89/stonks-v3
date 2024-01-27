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
    Order,
} from "../../types/types";
import { Config } from "../../config";

abstract class BrokerageProvider {
    // General props
    protected axios: Axios;
    protected config: Config;

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
    protected abstract positionPath: string;

    // Query string params
    protected securitiesQueryStringParams = "";
    protected buyQueryStringParams = "";
    protected sellQueryStringParams = "";
    protected historicalPriceDataQueryStringParams = "";
    protected positionsQueryStringParams = "";
    protected positionQueryStringParams = "";

    // Abstract helper methods
    protected abstract convertBuyOrderToRequestData(buyOrder: BuyOrder): object;
    protected abstract convertSellOrderToRequestData(sellOrder: SellOrder): object;
    protected abstract convertToSecurity(security: ProviderSecurity): Security;
    protected abstract convertToBuyResult(buyResult: ProviderBuyResult): BuyResult;
    protected abstract convertToSellResult(sellResult: ProviderSellResult): SellResult;
    protected abstract convertToPriceData(priceData: ProviderPriceData): PriceData;
    protected abstract convertToPosition(position: ProviderPosition): Position;
    protected abstract calculateFees(order: Order, currentPrice: number): number;

    constructor(config: Config) {
        this.config = config;
        this.axios = axios;
    }

    /*********************
     * Protected Methods *
     *********************/

    // Helper methods
    protected isLive(): boolean {
        return process.env.ENV == "production";
    }

    private getDomain() {
        return this.isLive() ? this.prodAPIDomain : this.devAPIDomain;
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

    protected filterOutNonTradableSecurities(securities: Security[]): Security[] {
        return securities.filter((security: Security) => security.symbol.endsWith("/USD"));
    }

    // URI methods
    protected getSecuritiesUri(): string {
        return `${this.getDomain()}${this.securitiesPath}`;
    }

    protected getBuyUri(): string {
        return `${this.getDomain()}${this.buyPath}`;
    }

    protected getSellUri(): string {
        return `${this.getDomain()}${this.sellPath}`;
    }

    protected getHistoricalPriceDataUri(): string {
        return `${this.getDomain()}${this.historicalPriceDataURIPath}`;
    }

    protected getLiquidateUri(symbol: string): string {
        console.log("getLiquidateUri", symbol);
        return `${this.getDomain()}${this.liquidatePath}/${symbol}`;
    }

    protected getPositionsUri(): string {
        return `${this.getDomain()}${this.positionsPath}`;
    }

    protected getPositionUri(symbol: string): string {
        return `${this.getDomain()}${this.positionPath}/${symbol}`;
    }

    // Query string params methods
    protected getSecuritiesQueryStringParams(): string {
        return this.securitiesQueryStringParams;
    }

    protected getBuyQueryStringParams(buyOrder: BuyOrder): string {
        console.log("getBuyQueryStringParams", buyOrder);
        return this.buyQueryStringParams;
    }

    protected getSellQueryStringParams(sellOrder: SellOrder): string {
        console.log("getSellQueryStringParams", sellOrder);
        return this.sellQueryStringParams;
    }

    protected getHistoricalPriceDataQueryStringParams(priceDataRequestParams: HistoricalPriceDataRequestParams): string {
        console.log("getHistoricalPriceDataQueryStringParams", priceDataRequestParams);
        return this.historicalPriceDataQueryStringParams;
    }

    protected getPositionsQueryStringParams(): string {
        return this.positionsQueryStringParams;
    }

    protected getPositionQueryStringParams(symbol: string): string {
        console.log("getPositionQueryStringParams", symbol);
        return this.positionQueryStringParams;
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

    protected getPositionHeaders(): object {
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
        const securities: Security[] = this.convertToSecuritiesArray(response.data);
        return this.filterOutNonTradableSecurities(securities);
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

    public async liquidate(symbol: string): Promise<SellResult> {
        // Setup
        const liquidateURI = `${this.getLiquidateUri(symbol)}`;
        const headers = this.getLiquidateHeaders();

        // Request
        const response = await this.axios.delete(liquidateURI, { headers });

        // Transform
        const sellResult: SellResult = this.convertToSellResult(response.data);

        // Return
        return sellResult;
    }

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

    /**
     * Retrieves a single position held in the brokerage account.
     *
     * @param symbol The symbol of the position to retrieve
     * @returns {Promise<Position>} A promise that resolves to a Position object
     */
    public async position(symbol: string): Promise<Position> {
        // Setup
        const positionURI = `${this.getPositionUri(symbol)}?${this.getPositionQueryStringParams(symbol)}`;
        const headers = this.getPositionHeaders();

        // Request
        const response = await axios.get(positionURI, { headers });

        // Transform
        const position: Position = this.convertToPosition(response.data);

        // Return
        return position;
    }

    /**
     * Determines whether or not a security is owned in the brokerage account.
     *
     * @param symbol The symbol of the security to check
     * @returns {Promise<boolean>} A promise that resolves to a boolean indicating whether or not the security is owned
     */
    public async isSecurityOwned(symbol: string): Promise<boolean> {
        try {
            const positionResponse = await this.position(symbol);
            if (positionResponse && positionResponse.qty > 0) {
                return true;
            }
        } catch (error: any) {
            if (error?.response?.status === 404) {
                // Security is not owned
            } else if (error?.response?.status === 422) {
                // Security does not exist
                throw new Error(`BrokerageProvider::isSecurityOwned() - Security ${symbol} does not exist`);
            } else {
                // Something else went wrong. Re-throw the error.
                throw error;
            }
        }

        return false;
    }
}

export default BrokerageProvider;
