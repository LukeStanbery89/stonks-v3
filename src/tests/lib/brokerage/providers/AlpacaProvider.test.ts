import AlpacaProvider from "../../../../lib/brokerage/providers/AlpacaProvider";
import { BuyOrder, OrderType, SellOrder } from "../../../../types/types";
import axios from "axios";

class TestAlpacaProvider extends AlpacaProvider {
    public testIsLive() {
        return this.isLive();
    }

    public testGetHistoricalPriceDataUri() {
        return this.getHistoricalPriceDataUri();
    }

    public testGetHistoricalPriceDataQueryStringParams(priceDataRequestParams: any): string {
        return this.getHistoricalPriceDataQueryStringParams(priceDataRequestParams);
    }
}

describe("Alpaca Provider", () => {
    beforeAll(() => {
        console.log = jest.fn();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe("securities()", () => {
        it("retrieves a list of buyable securities", async () => {
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

        it("rejects with an error when axios.get() rejects", async () => {
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
    });

    describe("buy()", () => {
        it("returns a BuyResult", async () => {
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

        it("rejects with an error when axios.post() rejects", async () => {
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
    });

    describe("sell()", () => {
        it("returns a SellResult", async () => {
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

        it("rejects with an error when axios.post() rejects", async () => {
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
    });

    describe("historicalPriceData()", () => {
        it("returns an array of PriceData objects", async () => {
            // Arrange
            const alpacaProvider = new AlpacaProvider();
            const expectedPriceData = {
                bars: {
                    "ETH/USD": [
                        {
                            c: 2281.185,
                            h: 2281.755,
                            l: 2281.185,
                            n: 0,
                            o: 2281.755,
                            t: "2024-01-01T00:00:00Z",
                            v: 0,
                            vw: 0,
                        },
                        {
                            c: 2282.205,
                            h: 2282.205,
                            l: 2282.205,
                            n: 0,
                            o: 2282.205,
                            t: "2024-01-01T00:01:00Z",
                            v: 0,
                            vw: 0,
                        },
                    ],
                },
                next_page_token: null,
            };

            const expectedPriceDataParams = {
                symbol: "ETH/USD",
                start: "2024-01-01T00:00:00.000Z",
                end: "2024-01-01T00:01:00.000Z",
                limit: 1000,
            };

            const expectedResponse = [
                {
                    close: 2281.185,
                    high: 2281.755,
                    low: 2281.185,
                    open: 2281.755,
                    timestamp: "2024-01-01T00:00:00Z",
                    volume: 0,
                },
                {
                    close: 2282.205,
                    high: 2282.205,
                    low: 2282.205,
                    open: 2282.205,
                    timestamp: "2024-01-01T00:01:00Z",
                    volume: 0,
                },
            ];

            // Mock the response from axios
            jest.spyOn(axios, "get").mockResolvedValueOnce({ data: expectedPriceData });

            // Act
            const priceData = alpacaProvider.historicalPriceData(expectedPriceDataParams);

            // Assert
            await expect(priceData).resolves.toEqual(expectedResponse);
        });

        it("makes multiple requests when there are multiple pages of data", async () => {
            // Arrange
            const alpacaProvider = new AlpacaProvider();
            const expectedPriceData = {
                bars: {
                    "ETH/USD": [
                        {
                            c: 2281.185,
                            h: 2281.755,
                            l: 2281.185,
                            n: 0,
                            o: 2281.755,
                            t: "2024-01-01T00:00:00Z",
                            v: 0,
                            vw: 0,
                        },
                        {
                            c: 2282.205,
                            h: 2282.205,
                            l: 2282.205,
                            n: 0,
                            o: 2282.205,
                            t: "2024-01-01T00:01:00Z",
                            v: 0,
                            vw: 0,
                        },
                    ],
                },
                next_page_token: "testPageToken",
            };

            const expectedPriceDataParams = {
                symbol: "ETH/USD",
                start: "2024-01-01T00:00:00.000Z",
                end: "2024-01-01T00:01:00.000Z",
                limit: 1000,
            };

            const expectedResponse = [
                {
                    close: 2281.185,
                    high: 2281.755,
                    low: 2281.185,
                    open: 2281.755,
                    timestamp: "2024-01-01T00:00:00Z",
                    volume: 0,
                },
                {
                    close: 2282.205,
                    high: 2282.205,
                    low: 2282.205,
                    open: 2282.205,
                    timestamp: "2024-01-01T00:01:00Z",
                    volume: 0,
                },
                {
                    close: 2281.185,
                    high: 2281.755,
                    low: 2281.185,
                    open: 2281.755,
                    timestamp: "2024-01-01T00:00:00Z",
                    volume: 0,
                },
                {
                    close: 2282.205,
                    high: 2282.205,
                    low: 2282.205,
                    open:
                    2282.205,
                    timestamp: "2024-01-01T00:01:00Z",
                    volume: 0,
                },
            ];

            // Mock the response from axios
            jest.spyOn(axios, "get").mockResolvedValueOnce({ data: expectedPriceData });

            // Act
            const priceData = alpacaProvider.historicalPriceData(expectedPriceDataParams);

            // Assert
            await expect(priceData).resolves.toEqual(expectedResponse);
        });

        it("rejects with an error when axios.get() rejects", async () => {
            // Arrange
            const alpacaProvider = new AlpacaProvider();
            const expectedPriceDataParams = {
                symbol: "ETH/USD",
                start: "2024-01-01T00:00:00.000Z",
                end: "2024-01-01T00:01:00.000Z",
                limit: 1000,
            };

            const expectedError = new Error("Test error");

            // Mock the response from axios
            jest.spyOn(axios, "get").mockRejectedValueOnce(expectedError);

            // Act
            const priceData = alpacaProvider.historicalPriceData(expectedPriceDataParams);

            // Assert
            await expect(priceData).rejects.toEqual(expectedError);
        });

        it("returns the correct query string params", () => {
            // Arrange
            const alpacaProvider = new TestAlpacaProvider();
            const expectedQueryStringParams = "symbols=ETH%2FUSD&start=2024-01-01T00%3A00%3A00.000Z&end=2024-01-01T00%3A01%3A00.000Z&limit=1000&timeframe=1Min";
            const priceDataParams = {
                symbol: "ETH/USD",
                start: "2024-01-01T00:00:00.000Z",
                end: "2024-01-01T00:01:00.000Z",
                limit: 1000,
            };

            // Act
            const queryStringParams = alpacaProvider.testGetHistoricalPriceDataQueryStringParams(priceDataParams);

            // Assert
            expect(queryStringParams).toEqual(expectedQueryStringParams);
        });

        it("returns the correct URI", () => {
            // Arrange
            const testAlpacaProvider = new TestAlpacaProvider();
            const expectedURI = "https://data.alpaca.markets/v1beta3/crypto/us/bars";

            // Act
            const uri = testAlpacaProvider.testGetHistoricalPriceDataUri();

            // Assert
            expect(uri).toEqual(expectedURI);
        });
    });

    describe("isLive()", () => {
        it("returns true when ENV is 'production'", () => {
            // Arrange
            process.env.ENV = "production";
            const testAlpacaProvider = new TestAlpacaProvider();

            // Act
            const isLive = testAlpacaProvider.testIsLive();

            // Assert
            expect(isLive).toEqual(true);
        });

        it("returns false when ENV is 'development'", () => {
            // Arrange
            process.env.ENV = "development";
            const testAlpacaProvider = new TestAlpacaProvider();

            // Act
            const isLive = testAlpacaProvider.testIsLive();

            // Assert
            expect(isLive).toEqual(false);
        });
    });
});
