import AlpacaProvider from "../../../../lib/brokerage/providers/AlpacaProvider";
import { BuyOrder, OrderType, Position, SellOrder } from "../../../../types/types";
import axios from "axios";
import mockSecuritiesResponse from "../../../mocks/responses/alpaca/mockSecuritiesResponse.json";
import mockBuyByQtyResponse from "../../../mocks/responses/alpaca/mockBuyByQtyResponse.json";
import mockBuyByNotionalResponse from "../../../mocks/responses/alpaca/mockBuyByNotionalResponse.json";
import mockSellByQtyResponse from "../../../mocks/responses/alpaca/mockSellByQtyResponse.json";
import mockSellByNotionalResponse from "../../../mocks/responses/alpaca/mockSellByNotionalResponse.json";
import mockDeletePositionResponse from "../../../mocks/responses/alpaca/mockDeletePositionResponse.json";
import mockGetPositionsResponse from "../../../mocks/responses/alpaca/mockGetPositionsResponse.json";
import mockGetPositionResponse from "../../../mocks/responses/alpaca/mockGetPositionResponse.json";
import config from "../../../../config";

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
            const alpacaProvider = new AlpacaProvider(config);

            // Only securities ending in "/USD" are buyable
            const expectedSecurities = [
                {
                    name: "Dogecoin / US Dollar",
                    symbol: "DOGE/USD",
                },
                {
                    name: "The Graph / US Dollar",
                    symbol: "GRT/USD",
                },
                {
                    name: "Curve / US Dollar",
                    symbol: "CRV/USD",
                },
                {
                    name: "Bitcoin Cash / US Dollar",
                    symbol: "BCH/USD",
                },
                {
                    name: "Bitcoin  / US Dollar",
                    symbol: "BTC/USD",
                },
                {
                    name: "Ethereum / US Dollar",
                    symbol: "ETH/USD",
                },
                {
                    name: "Uniswap / US Dollar",
                    symbol: "UNI/USD",
                },
                {
                    name: "USDC/USD pair",
                    symbol: "USDC/USD",
                },
                {
                    name: "USD Tether / US Dollar",
                    symbol: "USDT/USD",
                },
                {
                    name: "Tezos / US Dollar",
                    symbol: "XTZ/USD",
                },
                {
                    name: "Litecoin / US Dollar",
                    symbol: "LTC/USD",
                },
                {
                    name: "Chainlink / US Dollar",
                    symbol: "LINK/USD",
                },
                {
                    name: "Maker / US Dollar",
                    symbol: "MKR/USD",
                },
                {
                    name: "Shiba Inu / US Dollar",
                    symbol: "SHIB/USD",
                },
                {
                    name: "Aave / US Dollar",
                    symbol: "AAVE/USD",
                },
                {
                    name: "SushiSwap / US Dollar",
                    symbol: "SUSHI/USD",
                },
                {
                    name: "Yearn Finance / US Dollar",
                    symbol: "YFI/USD",
                },
                {
                    name: "Polkadot / US Dollar",
                    symbol: "DOT/USD",
                },
                {
                    name: "Avalanche / US Dollar",
                    symbol: "AVAX/USD",
                },
                {
                    name: "Basic Attention Token / US Dollar",
                    symbol: "BAT/USD",
                },
            ];

            // Mock the response from axios
            jest.spyOn(axios, "get").mockResolvedValueOnce({ data: mockSecuritiesResponse });

            // Act
            const securitiesPromise = alpacaProvider.securities();

            // Assert
            await expect(securitiesPromise).resolves.toEqual(expectedSecurities);
        });

        it("rejects with an error when axios.get() rejects", async () => {
            // Arrange
            const alpacaProvider = new AlpacaProvider(config);
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
            const alpacaProvider = new AlpacaProvider(config);
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
            const alpacaProvider = new AlpacaProvider(config);
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
            const alpacaProvider = new AlpacaProvider(config);
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
            const alpacaProvider = new AlpacaProvider(config);
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
            const alpacaProvider = new AlpacaProvider(config);
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
            const alpacaProvider = new AlpacaProvider(config);
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
            const alpacaProvider = new AlpacaProvider(config);
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
                    close: 2281.19,
                    high: 2281.76,
                    low: 2281.19,
                    open: 2281.76,
                    timestamp: "2024-01-01T00:00:00Z",
                    volume: 0,
                },
                {
                    close: 2282.21,
                    high: 2282.21,
                    low: 2282.21,
                    open: 2282.21,
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
            const alpacaProvider = new AlpacaProvider(config);
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
                    close: 2281.19,
                    high: 2281.76,
                    low: 2281.19,
                    open: 2281.76,
                    timestamp: "2024-01-01T00:00:00Z",
                    volume: 0,
                },
                {
                    close: 2282.21,
                    high: 2282.21,
                    low: 2282.21,
                    open: 2282.21,
                    timestamp: "2024-01-01T00:01:00Z",
                    volume: 0,
                },
                {
                    close: 2281.19,
                    high: 2281.76,
                    low: 2281.19,
                    open: 2281.76,
                    timestamp: "2024-01-01T00:00:00Z",
                    volume: 0,
                },
                {
                    close: 2282.21,
                    high: 2282.21,
                    low: 2282.21,
                    open: 2282.21,
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
            const alpacaProvider = new AlpacaProvider(config);
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
            const alpacaProvider = new TestAlpacaProvider(config);
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
            const testAlpacaProvider = new TestAlpacaProvider(config);
            const expectedURI = "https://data.alpaca.markets/v1beta3/crypto/us/bars";

            // Act
            const uri = testAlpacaProvider.testGetHistoricalPriceDataUri();

            // Assert
            expect(uri).toEqual(expectedURI);
        });

        it("makes the request using the default limit when no limit is provided", () => {
            // Arrange
            const alpacaProvider = new TestAlpacaProvider(config);
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
            const alpacaProvider = new AlpacaProvider(config);
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
            const alpacaProvider = new AlpacaProvider(config);
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
        it("returns an map of Position objects", async () => {
            // Arrange
            const alpacaProvider = new AlpacaProvider(config);

            const expectedPositions = {
                ETHUSD: {
                    symbol: "ETHUSD",
                    qty: 0.9975,
                },
                BTCUSD: {
                    symbol: "BTCUSD",
                    qty: 0.998,
                },
            };

            // Mock the response from axios
            jest.spyOn(axios, "get").mockResolvedValueOnce({ data: mockGetPositionsResponse });

            // Act
            const positionsPromise = alpacaProvider.positions();

            // Assert
            await expect(positionsPromise).resolves.toEqual(expectedPositions);
        });

        it("rejects with an error when axios.get() rejects", async () => {
            // Arrange
            const alpacaProvider = new AlpacaProvider(config);
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
            const alpacaProvider = new AlpacaProvider(config);
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
            const alpacaProvider = new AlpacaProvider(config);
            const expectedError = new Error("Test error");

            // Mock the response from axios
            jest.spyOn(axios, "get").mockRejectedValueOnce(expectedError);

            // Act
            const positionPromise = alpacaProvider.position("ETHUSD");

            // Assert
            await expect(positionPromise).rejects.toEqual(expectedError);
        });
    });

    describe("calculateFees()", () => {
        it("calculates the correct fee for a buy order", () => {
            // Arrange
            const testConfig = {
                ...config,
                ALPACA: {
                    ...config.ALPACA,
                    BUY_ORDER_FEE_PERCENTAGE: 0.03,
                },
            };
            const alpacaProvider = new TestAlpacaProvider(testConfig);
            const order: BuyOrder = {
                type: OrderType.BUY,
                symbol: "ETHUSD",
                qty: 1,
            };
            const currentPrice = 100;

            const expectedFee = 3;

            // Act
            const fee = alpacaProvider.calculateFeesForOrder(order, currentPrice);

            // Assert
            expect(fee).toEqual(expectedFee);
        });

        it("calculates the correct fee for a sell order", () => {
            // Arrange
            const testConfig = {
                ...config,
                ALPACA: {
                    ...config.ALPACA,
                    SELL_ORDER_FEE_PERCENTAGE: 0.03,
                },
            };
            const alpacaProvider = new TestAlpacaProvider(testConfig);
            const order: SellOrder = {
                type: OrderType.SELL,
                symbol: "ETHUSD",
                qty: 1,
            };
            const currentPrice = 100;

            const expectedFee = 3;

            // Act
            const fee = alpacaProvider.calculateFeesForOrder(order, currentPrice);

            // Assert
            expect(fee).toEqual(expectedFee);
        });
    });

    describe("isLive()", () => {
        it("returns true when ENV is 'production'", () => {
            // Arrange
            process.env.ENV = "production";
            const testAlpacaProvider = new TestAlpacaProvider(config);

            // Act
            const isLive = testAlpacaProvider.testIsLive();

            // Assert
            expect(isLive).toEqual(true);
        });

        it("returns false when ENV is 'development'", () => {
            // Arrange
            process.env.ENV = "development";
            const testAlpacaProvider = new TestAlpacaProvider(config);

            // Act
            const isLive = testAlpacaProvider.testIsLive();

            // Assert
            expect(isLive).toEqual(false);
        });
    });
});
