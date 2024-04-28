import BrokerageProvider from "../../../lib/brokerage/BrokerageProvider";
import { BuyOrder, BuyResult, HistoricalPriceDataRequestParams, Order, OrderType, Position, PriceData, Security, SellOrder, SellResult } from "../../../types/types";

type Transformable = {
    transformed: boolean,
};
type TestSecurity = Security & Transformable;
type TestBuyResult = BuyResult & Transformable;
type TestSellResult = SellResult & Transformable;
type TestPriceData = PriceData & Transformable;
type TestPosition = Position & Transformable;

class ConcreteBrokerageProvider extends BrokerageProvider {
    // Test implementations of abstract props
    protected defaultHeaders = {
        foo: "bar",
        accept: "application/json",
    };

    protected providerCommonHeaders = {};
    protected devAPIDomain = "https://dev.example.com";
    protected prodAPIDomain = "https://prod.example.com";

    protected securitiesPath = "/securities";
    protected buyPath = "/buy";
    protected sellPath = "/sell";
    protected historicalPriceDataURIPath = "/historical-price-data";
    protected liquidatePath = "/liquidate";
    protected positionsPath = "/positions";
    protected positionPath = "/position";

    protected securitiesQueryStringParams = "foo=bar";
    protected buyQueryStringParams = "foo=bar";
    protected sellQueryStringParams = "foo=bar";
    protected historicalPriceDataQueryStringParams = "foo=bar";

    // Test implementations of abstract methodsç
    protected convertBuyOrderToRequestData(buyOrder: BuyOrder): object {
        return {
            ...buyOrder,
            transformed: true,
        };
    }
    protected convertSellOrderToRequestData(sellOrder: SellOrder): object {
        return {
            ...sellOrder,
            transformed: true,
        };
    }
    protected convertToSecurity(security: Security): TestSecurity {
        return {
            ...security,
            transformed: true,
        };
    }
    protected convertToBuyResult(buyResult: BuyResult): TestBuyResult {
        return {
            ...buyResult,
            transformed: true,
        };
    }
    protected convertToSellResult(sellResult: SellResult): TestSellResult {
        return {
            ...sellResult,
            transformed: true,
        };
    }
    protected convertToPriceData(priceData: PriceData): TestPriceData {
        return {
            ...priceData,
            transformed: true,
        };
    }
    protected convertToPosition(position: Position): TestPosition {
        return {
            ...position,
            transformed: true,
        };
    }

    public calculateFeesForOrder(_order: Order, _currentPrice: number): number {
        return 0;
    }

    protected getPositionSymbol(position: { symbol: string }): string {
        return position.symbol;
    }

    public historicalPriceData(priceDataParams: HistoricalPriceDataRequestParams): Promise<PriceData[]> {
        console.log(priceDataParams);
        return Promise.resolve(
            [
                { timestamp: "2022-01-01", open: 100, high: 110, low: 90, close: 105, volume: 0 },
                { timestamp: "2022-01-02", open: 105, high: 115, low: 95, close: 110, volume: 0 },
            ],
        );
    }

    public liquidate(symbol: string): Promise<SellResult> {
        return Promise.resolve({
            type: OrderType.SELL,
            symbol,
            qty: 1,
            notional: 0,
        });
    }

    // Test helper methods
    public testConvertToSecuritiesArray(securities: Security[]): Security[] {
        return this.convertToSecuritiesArray(securities);
    }
    public testConvertToPriceDataArray(priceData: PriceData[]): PriceData[] {
        return this.convertToPriceDataArray(priceData);
    }
    public testFilterOutNonTradableSecurities(securities: Security[]): Security[] {
        return this.filterOutNonTradableSecurities(securities);
    }
    public testGetSecuritiesUri(): string {
        return this.getSecuritiesUri();
    }
    public testGetBuyUri(): string {
        return this.getBuyUri();
    }
    public testGetSellUri(): string {
        return this.getSellUri();
    }
    public testGetHistoricalPriceDataUri(): string {
        return this.getHistoricalPriceDataUri();
    }
    public testGetLiquidateUri(symbol: string): string {
        return this.getLiquidateUri(symbol);
    }
    public testGetPositionsUri(): string {
        return this.getPositionsUri();
    }
    public testGetSecuritiesQueryStringParams(): string {
        return this.getSecuritiesQueryStringParams();
    }
    public testGetBuyQueryStringParams(buyOrder: BuyOrder): string {
        return this.getBuyQueryStringParams(buyOrder);
    }
    public testGetSellQueryStringParams(sellOrder: SellOrder): string {
        return this.getSellQueryStringParams(sellOrder);
    }
    public testGetHistoricalPriceDataQueryStringParams(priceDataParams: HistoricalPriceDataRequestParams): string {
        return this.getHistoricalPriceDataQueryStringParams(priceDataParams);
    }
    public testGetRequestHeaders(): object {
        return this.getRequestHeaders();
    }
    public testGetSecuritiesHeaders(): object {
        return this.getSecuritiesHeaders();
    }
    public testGetBuyHeaders(): object {
        return this.getBuyHeaders();
    }
    public testGetSellHeaders(): object {
        return this.getSellHeaders();
    }
    public testGetHistoricalPriceDataHeaders(): object {
        return this.getHistoricalPriceDataHeaders();
    }
    public testGetLiquidateHeaders(): object {
        return this.getLiquidateHeaders();
    }
    public testGetPositionsHeaders(): object {
        return this.getPositionsHeaders();
    }
    public async testIsSecurityOwned(symbol: string): Promise<boolean> {
        return await this.isSecurityOwned(symbol);
    }
}

export default ConcreteBrokerageProvider;
