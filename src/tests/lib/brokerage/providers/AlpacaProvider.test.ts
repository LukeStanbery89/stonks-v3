import AlpacaProvider from "../../../../lib/brokerage/providers/AlpacaProvider";
import { BuyOrder, OrderType, SellOrder } from "../../../../types/types";

class TestAlpacaProvider extends AlpacaProvider {
    public testGetAPIDomain(): string {
        return this.getAPIDomain();
    }
}

describe("Alpaca Provider", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("securities() retrieves a list of buyable securities", () => {
        // Arrange
        const alpacaProvider = new AlpacaProvider();
        const expectedSecurities = [
            {
                symbol: "BTCUSD",
                name: "Bitcoin",
            },
            {
                symbol: "ETHUSD",
                name: "Ethereum",
            },
            {
                symbol: "LTCUSD",
                name: "Litecoin",
            },
        ];

        // Mock the response from fetch()
        const mockFetchPromise = Promise.resolve({
            json: () => Promise.resolve(expectedSecurities),
        } as Response);
        jest.spyOn(global, "fetch").mockImplementation(() => mockFetchPromise);

        // Act
        const securitiesPromise = alpacaProvider.securities();

        // Assert
        return expect(securitiesPromise).resolves.toEqual(expectedSecurities);
    });

    test("securities() rejects with an error when fetch() rejects", () => {
        // Arrange
        const alpacaProvider = new AlpacaProvider();
        const expectedError = new Error("Test error");

        // Mock the response from fetch()
        const mockFetchPromise = Promise.reject(expectedError);
        jest.spyOn(global, "fetch").mockImplementation(() => mockFetchPromise);

        // Act
        const securitiesPromise = alpacaProvider.securities();

        // Assert
        return expect(securitiesPromise).rejects.toEqual(expectedError);
    });

    test("buy() returns a BuyResult", () => {
        // Arrange
        const alpacaProvider = new AlpacaProvider();
        const buyOrder: BuyOrder = {
            type: OrderType.BUY,
            symbol: "BTCUSD",
            notional: 100,
        };

        const expectedBuyResult = {
            type: "BUY",
            symbol: "BTCUSD",
            notional: 100,
        };

        // Mock the response from fetch()
        const mockFetchPromise = Promise.resolve({
            json: () => Promise.resolve(expectedBuyResult),
        } as Response);
        jest.spyOn(global, "fetch").mockImplementation(() => mockFetchPromise);

        // Act
        const buyPromise = alpacaProvider.buy(buyOrder);

        // Assert
        return expect(buyPromise).resolves.toEqual(expectedBuyResult);
    });

    test("buy() rejects with an error when fetch() rejects", () => {
        // Arrange
        const alpacaProvider = new AlpacaProvider();
        const buyOrder: BuyOrder = {
            type: OrderType.BUY,
            symbol: "BTCUSD",
            notional: 100,
        };

        const expectedError = new Error("Test error");

        // Mock the response from fetch()
        const mockFetchPromise = Promise.reject(expectedError);
        jest.spyOn(global, "fetch").mockImplementation(() => mockFetchPromise);

        // Act
        const buyPromise = alpacaProvider.buy(buyOrder);

        // Assert
        return expect(buyPromise).rejects.toEqual(expectedError);
    });

    test("sell() returns a SellResult", () => {
        // Arrange
        const alpacaProvider = new AlpacaProvider();
        const sellOrder: SellOrder = {
            type: OrderType.SELL,
            symbol: "BTCUSD",
            notional: 100,
        };

        const expectedSellResult = {
            type: "SELL",
            symbol: "BTCUSD",
            notional: 100,
        };

        // Mock the response from fetch()
        const mockFetchPromise = Promise.resolve({
            json: () => Promise.resolve(expectedSellResult),
        } as Response);
        jest.spyOn(global, "fetch").mockImplementation(() => mockFetchPromise);

        // Act
        const sellPromise = alpacaProvider.sell(sellOrder);

        // Assert
        return expect(sellPromise).resolves.toEqual(expectedSellResult);
    });

    test("sell() rejects with an error when fetch() rejects", () => {
        // Arrange
        const alpacaProvider = new AlpacaProvider();
        const sellOrder: SellOrder = {
            type: OrderType.SELL,
            symbol: "BTCUSD",
            notional: 100,
        };

        const expectedError = new Error("Test error");

        // Mock the response from fetch()
        const mockFetchPromise = Promise.reject(expectedError);
        jest.spyOn(global, "fetch").mockImplementation(() => mockFetchPromise);

        // Act
        const sellPromise = alpacaProvider.sell(sellOrder);

        // Assert
        return expect(sellPromise).rejects.toEqual(expectedError);
    });

    test("getAPIDomain() returns the dev domain when NODE_ENV is 'development'", () => {
        // Arrange
        const testAlpacaProvider = new TestAlpacaProvider();
        const expectedDomain = "https://paper-api.alpaca.markets";

        // Act
        const actualDomain = testAlpacaProvider.testGetAPIDomain();

        // Assert
        expect(actualDomain).toEqual(expectedDomain);
    });

    test("getAPIDomain() returns the prod domain when NODE_ENV is 'production'", () => {
        // Arrange
        process.env.NODE_ENV = "production";
        const testAlpacaProvider = new TestAlpacaProvider();
        const expectedDomain = "https://api.alpaca.markets";

        // Act
        const actualDomain = testAlpacaProvider.testGetAPIDomain();

        // Assert
        expect(actualDomain).toEqual(expectedDomain);
    });
});
