import axios from "axios";
import config from "../../../config";
import ConcreteBrokerageProvider from "./ConcreteBrokerageProvider";

describe("Brokerage Provider", () => {
    beforeAll(() => {
        // console.log = jest.fn();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe("isSecurityOwned()", () => {
        afterEach(() => {
            jest.resetAllMocks();
        });

        it("should return true if the security is owned", async () => {
            // Mock
            jest.spyOn(axios, "get").mockResolvedValue({
                data: {
                    symbol: "ETHUSD",
                    qty: 1,
                },
            });
            const brokerageProvider = new ConcreteBrokerageProvider(config);

            // Act
            const symbol = "ETHUSD";
            const isOwned = await brokerageProvider.isSecurityOwned(symbol);

            // Assert
            expect(isOwned).toEqual(true);
        });

        it("should return false if the security is not owned and the response is 404", async () => {
            // Mock
            jest.spyOn(axios, "get").mockRejectedValue({
                response: {
                    status: 404,
                    data: {
                        code: 40410000,
                        message: "position does not exist",
                    },
                },
            });
            const brokerageProvider = new ConcreteBrokerageProvider(config);

            // Act
            const symbol = "BTCUSD";
            const isOwned = await brokerageProvider.isSecurityOwned(symbol);

            // Assert
            expect(isOwned).toEqual(false);
        });

        it("should return false if the security is not owned and the response is 422", async () => {
            // Mock
            jest.spyOn(axios, "get").mockRejectedValue({
                response: {
                    status: 422,
                    data: {
                        code: 42210000,
                        message: "invalid symbol",
                    },
                },
            });
            const brokerageProvider = new ConcreteBrokerageProvider(config);

            // Act
            const symbol = "FAKEUSD";
            let error;
            try {
                await brokerageProvider.isSecurityOwned(symbol);
            } catch (e) {
                error = e;
            }

            // Assert
            expect(error).toEqual(new Error("BrokerageProvider::isSecurityOwned() - Security FAKEUSD does not exist"));
        });

        it("should throw an error if the axios request fails", async () => {
            // Mock
            jest.spyOn(axios, "get").mockRejectedValue(new Error("Network Error"));
            const brokerageProvider = new ConcreteBrokerageProvider(config);

            // Act
            const symbol = "BTCUSD";
            let error;
            try {
                await brokerageProvider.isSecurityOwned(symbol);
            } catch (e) {
                error = e;
            }

            // Assert
            expect(error).toEqual(new Error("Network Error"));
        });
    });

    describe("convertToSecuritiesArray()", () => {
        it("should convert the provider's security type to the app's security type", () => {
            const brokerageProvider = new ConcreteBrokerageProvider(config);
            const providerSecurity = {
                symbol: "AAPL",
                name: "Apple",
            };
            const expectedSecurity = {
                symbol: "AAPL",
                name: "Apple",
                transformed: true,
            };
            const securities = brokerageProvider.testConvertToSecuritiesArray([providerSecurity]);
            expect(securities).toEqual([expectedSecurity]);
        });
    });

    describe("convertToPriceDataArray()", () => {
        it("should convert the provider's price data type to the app's price data type", () => {
            const brokerageProvider = new ConcreteBrokerageProvider(config);
            const providerPriceData = [
                { timestamp: "2022-01-01", open: 100, high: 110, low: 90, close: 105, volume: 0 },
                { timestamp: "2022-01-02", open: 105, high: 115, low: 95, close: 110, volume: 0 },
            ];
            const expectedPriceData = [
                { timestamp: "2022-01-01", open: 100, high: 110, low: 90, close: 105, volume: 0, transformed: true },
                { timestamp: "2022-01-02", open: 105, high: 115, low: 95, close: 110, volume: 0, transformed: true },
            ];
            const priceData = brokerageProvider.testConvertToPriceDataArray(providerPriceData);
            expect(priceData).toEqual(expectedPriceData);
        });
    });

    describe("filterOutNonTradableSecurities()", () => {
        it("should filter out securities that are not tradable", () => {
            const brokerageProvider = new ConcreteBrokerageProvider(config);
            const securities = [
                { symbol: "ETH/USD", name: "Ethereum" },
                { symbol: "BTC/USD", name: "Bitcoin" },
                { symbol: "ETH/USDT", name: "Ethereum" },
                { symbol: "BTC/USDT", name: "Bitcoin" },
                { symbol: "AAPL", name: "Apple" },
            ];
            const expectedSecurities = [
                { symbol: "ETH/USD", name: "Ethereum" },
                { symbol: "BTC/USD", name: "Bitcoin" },
            ];
            const filteredSecurities = brokerageProvider.testFilterOutNonTradableSecurities(securities);
            expect(filteredSecurities).toEqual(expectedSecurities);
        });
    });

    describe("getSecuritiesUri()", () => {
        it("should return the URI for the productin securities endpoint when isLive() returns true", () => {
            const brokerageProvider = new ConcreteBrokerageProvider(config);
            process.env.ENV = "production";
            const expectedURI = "https://prod.example.com/securities";
            const uri = brokerageProvider.testGetSecuritiesUri();
            expect(uri).toEqual(expectedURI);
        });

        it("should return the URI for the development securities endpoint when isLive() returns false", () => {
            const brokerageProvider = new ConcreteBrokerageProvider(config);
            process.env.ENV = "development";
            const expectedURI = "https://dev.example.com/securities";
            const uri = brokerageProvider.testGetSecuritiesUri();
            expect(uri).toEqual(expectedURI);
        });
    });

    describe("getBuyUri()", () => {
        it("should return the URL for the production buy endpoint when isLive() returns true", () => {
            const brokerageProvider = new ConcreteBrokerageProvider(config);
            process.env.ENV = "production";
            const expectedURI = "https://prod.example.com/buy";
            const uri = brokerageProvider.testGetBuyUri();
            expect(uri).toEqual(expectedURI);
        });

        it("should return the URL for the development buy endpoint when isLive() returns false", () => {
            const brokerageProvider = new ConcreteBrokerageProvider(config);
            process.env.ENV = "development";
            const expectedURI = "https://dev.example.com/buy";
            const uri = brokerageProvider.testGetBuyUri();
            expect(uri).toEqual(expectedURI);
        });
    });

    describe("getSellUri()", () => {
        it("should return the URL for the production sell endpoint when isLive() returns true", () => {
            const brokerageProvider = new ConcreteBrokerageProvider(config);
            process.env.ENV = "production";
            const expectedURI = "https://prod.example.com/sell";
            const uri = brokerageProvider.testGetSellUri();
            expect(uri).toEqual(expectedURI);
        });

        it("should return the URL for the development sell endpoint when isLive() returns false", () => {
            const brokerageProvider = new ConcreteBrokerageProvider(config);
            process.env.ENV = "development";
            const expectedURI = "https://dev.example.com/sell";
            const uri = brokerageProvider.testGetSellUri();
            expect(uri).toEqual(expectedURI);
        });
    });

    describe("getHistoricalPriceDataUri()", () => {
        it("should return the URL for the production historical price data endpoint when isLive() returns true", () => {
            const brokerageProvider = new ConcreteBrokerageProvider(config);
            process.env.ENV = "production";
            const expectedURI = "https://prod.example.com/historical-price-data";
            const uri = brokerageProvider.testGetHistoricalPriceDataUri();
            expect(uri).toEqual(expectedURI);
        });

        it("should return the URL for the development historical price data endpoint when isLive() returns false", () => {
            const brokerageProvider = new ConcreteBrokerageProvider(config);
            process.env.ENV = "development";
            const expectedURI = "https://dev.example.com/historical-price-data";
            const uri = brokerageProvider.testGetHistoricalPriceDataUri();
            expect(uri).toEqual(expectedURI);
        });
    });

    describe("getLiquidateUri()", () => {
        it("should return the URL for the production liquidate endpoint when isLive() returns true", () => {
            const brokerageProvider = new ConcreteBrokerageProvider(config);
            process.env.ENV = "production";
            const expectedURI = "https://prod.example.com/liquidate/ETHUSD";
            const uri = brokerageProvider.testGetLiquidateUri("ETHUSD");
            expect(uri).toEqual(expectedURI);
        });

        it("should return the URL for the development liquidate endpoint when isLive() returns false", () => {
            const brokerageProvider = new ConcreteBrokerageProvider(config);
            process.env.ENV = "development";
            const expectedURI = "https://dev.example.com/liquidate/ETHUSD";
            const uri = brokerageProvider.testGetLiquidateUri("ETHUSD");
            expect(uri).toEqual(expectedURI);
        });
    });

    describe("getPositionsUri()", () => {
        it("should return the URL for the production positions endpoint when isLive() returns true", () => {
            const brokerageProvider = new ConcreteBrokerageProvider(config);
            process.env.ENV = "production";
            const expectedURI = "https://prod.example.com/positions";
            const uri = brokerageProvider.testGetPositionsUri();
            expect(uri).toEqual(expectedURI);
        });

        it("should return the URL for the development positions endpoint when isLive() returns false", () => {
            const brokerageProvider = new ConcreteBrokerageProvider(config);
            process.env.ENV = "development";
            const expectedURI = "https://dev.example.com/positions";
            const uri = brokerageProvider.testGetPositionsUri();
            expect(uri).toEqual(expectedURI);
        });
    });

    describe("getSecuritiesQueryStringParams()", () => {
        it("should return the query string params for the securities endpoint", () => {
            const brokerageProvider = new ConcreteBrokerageProvider(config);
            const expectedQueryStringParams = "foo=bar";
            const queryStringParams = brokerageProvider.testGetSecuritiesQueryStringParams();
            expect(queryStringParams).toEqual(expectedQueryStringParams);
        });
    });

    describe("getBuyQueryStringParams()", () => {
        it("should return the query string params for the buy endpoint", () => {
            const brokerageProvider = new ConcreteBrokerageProvider(config);
            const expectedQueryStringParams = "foo=bar";
            const queryStringParams = brokerageProvider.testGetBuyQueryStringParams({} as any);
            expect(queryStringParams).toEqual(expectedQueryStringParams);
        });
    });

    describe("getSellQueryStringParams()", () => {
        it("should return the query string params for the sell endpoint", () => {
            const brokerageProvider = new ConcreteBrokerageProvider(config);
            const expectedQueryStringParams = "foo=bar";
            const queryStringParams = brokerageProvider.testGetSellQueryStringParams({} as any);
            expect(queryStringParams).toEqual(expectedQueryStringParams);
        });
    });

    describe("getHistoricalPriceDataQueryStringParams()", () => {
        it("should return the query string params for the historical price data endpoint", () => {
            const brokerageProvider = new ConcreteBrokerageProvider(config);
            const expectedQueryStringParams = "foo=bar";
            const queryStringParams = brokerageProvider.testGetHistoricalPriceDataQueryStringParams({} as any);
            expect(queryStringParams).toEqual(expectedQueryStringParams);
        });
    });

    describe("getRequestHeaders()", () => {
        it("should return the request headers", () => {
            const brokerageProvider = new ConcreteBrokerageProvider(config);
            const expectedHeaders = {
                foo: "bar",
                accept: "application/json",
            };
            const headers = brokerageProvider.testGetRequestHeaders();
            expect(headers).toEqual(expectedHeaders);
        });
    });

    describe("getSecuritiesHeaders()", () => {
        it("should return the headers for the securities endpoint", () => {
            const brokerageProvider = new ConcreteBrokerageProvider(config);
            const expectedHeaders = {
                foo: "bar",
                accept: "application/json",
            };
            const headers = brokerageProvider.testGetSecuritiesHeaders();
            expect(headers).toEqual(expectedHeaders);
        });
    });

    describe("getBuyHeaders()", () => {
        it("should return the headers for the buy endpoint", () => {
            const brokerageProvider = new ConcreteBrokerageProvider(config);
            const expectedHeaders = {
                foo: "bar",
                accept: "application/json",
            };
            const headers = brokerageProvider.testGetBuyHeaders();
            expect(headers).toEqual(expectedHeaders);
        });
    });

    describe("getSellHeaders()", () => {
        it("should return the headers for the sell endpoint", () => {
            const brokerageProvider = new ConcreteBrokerageProvider(config);
            const expectedHeaders = {
                foo: "bar",
                accept: "application/json",
            };
            const headers = brokerageProvider.testGetSellHeaders();
            expect(headers).toEqual(expectedHeaders);
        });
    });

    describe("getHistoricalPriceDataHeaders()", () => {
        it("should return the headers for the historical price data endpoint", () => {
            const brokerageProvider = new ConcreteBrokerageProvider(config);
            const expectedHeaders = {
                foo: "bar",
                accept: "application/json",
            };
            const headers = brokerageProvider.testGetHistoricalPriceDataHeaders();
            expect(headers).toEqual(expectedHeaders);
        });
    });

    describe("getLiquidateHeaders()", () => {
        it("should return the headers for the liquidate endpoint", () => {
            const brokerageProvider = new ConcreteBrokerageProvider(config);
            const expectedHeaders = {
                foo: "bar",
                accept: "application/json",
            };
            const headers = brokerageProvider.testGetLiquidateHeaders();
            expect(headers).toEqual(expectedHeaders);
        });
    });

    describe("getPositionsHeaders()", () => {
        it("should return the headers for the positions endpoint", () => {
            const brokerageProvider = new ConcreteBrokerageProvider(config);
            const expectedHeaders = {
                foo: "bar",
                accept: "application/json",
            };
            const headers = brokerageProvider.testGetPositionsHeaders();
            expect(headers).toEqual(expectedHeaders);
        });
    });
});
