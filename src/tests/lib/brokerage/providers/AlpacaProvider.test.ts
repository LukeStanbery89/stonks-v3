import AlpacaProvider from "../../../../lib/brokerage/providers/AlpacaProvider";
import { AlpacaPosition, BuyOrder, OrderType, Position, SellOrder } from "../../../../types/types";
import axios from "axios";
import mockSecuritiesResponse from "../../../mocks/responses/alpaca/mockSecuritiesResponse.json";
import mockBuyByQtyResponse from "../../../mocks/responses/alpaca/mockBuyByQtyResponse.json";
import mockBuyByNotionalResponse from "../../../mocks/responses/alpaca/mockBuyByNotionalResponse.json";
import mockSellByQtyResponse from "../../../mocks/responses/alpaca/mockSellByQtyResponse.json";
import mockSellByNotionalResponse from "../../../mocks/responses/alpaca/mockSellByNotionalResponse.json";
import mockDeletePositionResponse from "../../../mocks/responses/alpaca/mockDeletePositionResponse.json";
import mockGetPositionsResponse from "../../../mocks/responses/alpaca/mockGetPositionsResponse.json";
import mockGetPositionResponse from "../../../mocks/responses/alpaca/mockGetPositionResponse.json";

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

            const expectedSecurities = mockSecuritiesResponse.map(security => {
                return {
                    symbol: security.symbol,
                    name: security.name,
                };
            });

            // Mock the response from axios
            jest.spyOn(axios, "get").mockResolvedValueOnce({ data: mockSecuritiesResponse });

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
        it("returns a BuyResult when specifying a qty", async () => {
            // Arrange
            const alpacaProvider = new AlpacaProvider();
            const buyOrder: BuyOrder = {
                type: OrderType.BUY,
                symbol: "ETHUSD",
                qty: 1,
            };

            const expectedBuyResult = {
                type: "BUY",
                symbol: "ETH/USD",
                qty: 1,
                notional: null,
            };

            // Mock the response from axios
            jest.spyOn(axios, "post").mockResolvedValueOnce({ data: mockBuyByQtyResponse });

            // Act
            const buyPromise = alpacaProvider.buy(buyOrder);

            // Assert
            await expect(buyPromise).resolves.toEqual(expectedBuyResult);
        });

        it("returns a BuyResult when specifying a notional", async () => {
            // Arrange
            const alpacaProvider = new AlpacaProvider();
            const buyOrder: BuyOrder = {
                type: OrderType.BUY,
                symbol: "ETHUSD",
                notional: 100,
            };

            const expectedBuyResult = {
                type: "BUY",
                symbol: "ETH/USD",
                notional: 100,
                qty: null,
            };

            // Mock the response from axios
            jest.spyOn(axios, "post").mockResolvedValueOnce({ data: mockBuyByNotionalResponse });

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
                symbol: "ETHUSD",
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
        it("returns a SellResult when specifying a qty", async () => {
            // Arrange
            const alpacaProvider = new AlpacaProvider();
            const sellOrder: SellOrder = {
                type: OrderType.SELL,
                symbol: "ETHUSD",
                qty: 2,
            };

            const expectedSellResult = {
                type: "SELL",
                symbol: "ETH/USD",
                qty: 2,
                notional: null,
            };

            // Mock the response from axios
            jest.spyOn(axios, "post").mockResolvedValueOnce({ data: mockSellByQtyResponse });

            // Act
            const sellPromise = alpacaProvider.sell(sellOrder);

            // Assert
            await expect(sellPromise).resolves.toEqual(expectedSellResult);
        });

        it("returns a SellResult when specifying a notional", async () => {
            // Arrange
            const alpacaProvider = new AlpacaProvider();
            const sellOrder: SellOrder = {
                type: OrderType.SELL,
                symbol: "ETHUSD",
                notional: 100,
            };

            const expectedSellResult = {
                type: "SELL",
                symbol: "ETH/USD",
                notional: 100,
                qty: null,
            };

            // Mock the response from axios
            jest.spyOn(axios, "post").mockResolvedValueOnce({ data: mockSellByNotionalResponse });

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
                symbol: "ETHUSD",
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

        it("makes the request using the default limit when no limit is provided", () => {
            // Arrange
            const alpacaProvider = new TestAlpacaProvider();
            const expectedQueryStringParams = "symbols=ETH%2FUSD&start=2024-01-01T00%3A00%3A00.000Z&end=2024-01-01T00%3A01%3A00.000Z&limit=1000&timeframe=1Min";
            const priceDataParams = {
                symbol: "ETH/USD",
                start: "2024-01-01T00:00:00.000Z",
                end: "2024-01-01T00:01:00.000Z",
            };

            // Act
            const queryStringParams = alpacaProvider.testGetHistoricalPriceDataQueryStringParams(priceDataParams);

            // Assert
            expect(queryStringParams).toEqual(expectedQueryStringParams);
        });
    });

    describe("liquidate()", () => {
        it("returns a SellResult", async () => {
            // Arrange
            const alpacaProvider = new AlpacaProvider();
            const symbol = "ETHUSD";

            const expectedSellResult = {
                type: OrderType.SELL,
                symbol: "ETH/USD",
                qty: 0.9975,
                notional: null,
            };

            // Mock the response from axios
            jest.spyOn(axios, "delete").mockResolvedValueOnce({ data: mockDeletePositionResponse });

            // Act
            const sellPromise = alpacaProvider.liquidate(symbol);

            // Assert
            await expect(sellPromise).resolves.toEqual(expectedSellResult);
        });

        it("rejects with an error when axios.delete() rejects", async () => {
            // Arrange
            const alpacaProvider = new AlpacaProvider();
            const symbol = "ETHUSD";

            const expectedError = new Error("Test error");

            // Mock the response from axios
            jest.spyOn(axios, "delete").mockRejectedValueOnce(expectedError);

            // Act
            const sellPromise = alpacaProvider.liquidate(symbol);

            // Assert
            await expect(sellPromise).rejects.toEqual(expectedError);
        });
    });

    describe("positions()", () => {
        it("returns an array of Position objects", async () => {
            // Arrange
            const alpacaProvider = new AlpacaProvider();

            const expectedPositions = [
                {
                    symbol: "ETHUSD",
                    qty: 0.9975,
                },
                {
                    symbol: "BTCUSD",
                    qty: 0.998,
                },
            ];

            // Mock the response from axios
            jest.spyOn(axios, "get").mockResolvedValueOnce({ data: mockGetPositionsResponse });

            // Act
            const positionsPromise = alpacaProvider.positions();

            // Assert
            await expect(positionsPromise).resolves.toEqual(expectedPositions);
        });

        it("rejects with an error when axios.get() rejects", async () => {
            // Arrange
            const alpacaProvider = new AlpacaProvider();
            const expectedError = new Error("Test error");

            // Mock the response from axios
            jest.spyOn(axios, "get").mockRejectedValueOnce(expectedError);

            // Act
            const positionsPromise = alpacaProvider.positions();

            // Assert
            await expect(positionsPromise).rejects.toEqual(expectedError);
        });
    });

    describe("position()", () => {
        it("returns a Position object", async () => {
            // Arrange
            const alpacaProvider = new AlpacaProvider();
            const symbol = "ETHUSD";
            const expectedPosition: Position = {
                symbol,
                qty: 0.9975,
            };

            // Mock the response from axios
            jest.spyOn(axios, "get").mockResolvedValueOnce({ data: mockGetPositionResponse });

            // Act
            const positionPromise = alpacaProvider.position(symbol);

            // Assert
            await expect(positionPromise).resolves.toEqual(expectedPosition);
        });

        it("rejects with an error when axios.get() rejects", async () => {
            // Arrange
            const alpacaProvider = new AlpacaProvider();
            const expectedError = new Error("Test error");

            // Mock the response from axios
            jest.spyOn(axios, "get").mockRejectedValueOnce(expectedError);

            // Act
            const positionPromise = alpacaProvider.position("ETHUSD");

            // Assert
            await expect(positionPromise).rejects.toEqual(expectedError);
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
