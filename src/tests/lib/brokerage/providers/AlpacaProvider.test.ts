import AlpacaProvider from "../../../../lib/brokerage/providers/AlpacaProvider";
import { BuyOrder, OrderType, SellOrder } from "../../../../types/types";
import axios from "axios";

class TestAlpacaProvider extends AlpacaProvider {
    public testGetAPIDomain(): string {
        return this.getAPIDomain();
    }
}

describe("Alpaca Provider", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("securities() retrieves a list of buyable securities", async () => {
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

        // Mock the response from axios
        jest.spyOn(axios, "get").mockResolvedValueOnce({ data: expectedSecurities });

        // Act
        const securitiesPromise = alpacaProvider.securities();

        // Assert
        await expect(securitiesPromise).resolves.toEqual(expectedSecurities);
    });

    test("securities() rejects with an error when axios.get() rejects", async () => {
        // Arrange
        const alpacaProvider = new AlpacaProvider();
        const expectedError = new Error("Test error");

        // Mock the response from axios
        jest.spyOn(axios, "get").mockRejectedValueOnce(expectedError);

        // Act
        const securitiesPromise = alpacaProvider.securities();

        // Assert
        await expect(securitiesPromise).rejects.toEqual(expectedError);
    });

    test("buy() returns a BuyResult", async () => {
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

        // Mock the response from axios
        jest.spyOn(axios, "post").mockResolvedValueOnce({ data: expectedBuyResult });

        // Act
        const buyPromise = alpacaProvider.buy(buyOrder);

        // Assert
        await expect(buyPromise).resolves.toEqual(expectedBuyResult);
    });

    test("buy() rejects with an error when axios.post() rejects", async () => {
        // Arrange
        const alpacaProvider = new AlpacaProvider();
        const buyOrder: BuyOrder = {
            type: OrderType.BUY,
            symbol: "BTCUSD",
            notional: 100,
        };

        const expectedError = new Error("Test error");

        // Mock the response from axios
        jest.spyOn(axios, "post").mockRejectedValueOnce(expectedError);

        // Act
        const buyPromise = alpacaProvider.buy(buyOrder);

        // Assert
        await expect(buyPromise).rejects.toEqual(expectedError);
    });

    test("sell() returns a SellResult", async () => {
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

        // Mock the response from axios
        jest.spyOn(axios, "post").mockResolvedValueOnce({ data: expectedSellResult });

        // Act
        const sellPromise = alpacaProvider.sell(sellOrder);

        // Assert
        await expect(sellPromise).resolves.toEqual(expectedSellResult);
    });

    test("sell() rejects with an error when axios.post() rejects", async () => {
        // Arrange
        const alpacaProvider = new AlpacaProvider();
        const sellOrder: SellOrder = {
            type: OrderType.SELL,
            symbol: "BTCUSD",
            notional: 100,
        };

        const expectedError = new Error("Test error");

        // Mock the response from axios
        jest.spyOn(axios, "post").mockRejectedValueOnce(expectedError);

        // Act
        const sellPromise = alpacaProvider.sell(sellOrder);

        // Assert
        await expect(sellPromise).rejects.toEqual(expectedError);
    });

    test("getAPIDomain() returns the dev domain when ENV is 'development'", () => {
        // Arrange
        const testAlpacaProvider = new TestAlpacaProvider();
        const expectedDomain = "https://paper-api.alpaca.markets";

        // Act
        const actualDomain = testAlpacaProvider.testGetAPIDomain();

        // Assert
        expect(actualDomain).toEqual(expectedDomain);
    });

    test("getAPIDomain() returns the prod domain when ENV is 'production'", () => {
        // Arrange
        process.env.ENV = "production";
        const testAlpacaProvider = new TestAlpacaProvider();
        const expectedDomain = "https://api.alpaca.markets";

        // Act
        const actualDomain = testAlpacaProvider.testGetAPIDomain();

        // Assert
        expect(actualDomain).toEqual(expectedDomain);
    });
});
