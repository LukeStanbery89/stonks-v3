import ConcreteBrokerageProvider from "./ConcreteBrokerageProvider";

describe("Brokerage Provider", () => {
    beforeAll(() => {
        console.log = jest.fn();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe("convertToSecuritiesArray()", () => {
        it("should convert the provider's security type to the app's security type", () => {
            const brokerageProvider = new ConcreteBrokerageProvider();
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
            const brokerageProvider = new ConcreteBrokerageProvider();
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

    describe("getSecuritiesUri()", () => {
        it("should return the URI for the productin securities endpoint when isLive() returns true", () => {
            const brokerageProvider = new ConcreteBrokerageProvider();
            process.env.ENV = "production";
            const expectedURI = "https://prod.example.com/securities";
            const uri = brokerageProvider.testGetSecuritiesUri();
            expect(uri).toEqual(expectedURI);
        });

        it("should return the URI for the development securities endpoint when isLive() returns false", () => {
            const brokerageProvider = new ConcreteBrokerageProvider();
            process.env.ENV = "development";
            const expectedURI = "https://dev.example.com/securities";
            const uri = brokerageProvider.testGetSecuritiesUri();
            expect(uri).toEqual(expectedURI);
        });
    });

    describe("getBuyUri()", () => {
        it("should return the URL for the production buy endpoint when isLive() returns true", () => {
            const brokerageProvider = new ConcreteBrokerageProvider();
            process.env.ENV = "production";
            const expectedURI = "https://prod.example.com/buy";
            const uri = brokerageProvider.testGetBuyUri();
            expect(uri).toEqual(expectedURI);
        });

        it("should return the URL for the development buy endpoint when isLive() returns false", () => {
            const brokerageProvider = new ConcreteBrokerageProvider();
            process.env.ENV = "development";
            const expectedURI = "https://dev.example.com/buy";
            const uri = brokerageProvider.testGetBuyUri();
            expect(uri).toEqual(expectedURI);
        });
    });

    describe("getSellUri()", () => {
        it("should return the URL for the production sell endpoint when isLive() returns true", () => {
            const brokerageProvider = new ConcreteBrokerageProvider();
            process.env.ENV = "production";
            const expectedURI = "https://prod.example.com/sell";
            const uri = brokerageProvider.testGetSellUri();
            expect(uri).toEqual(expectedURI);
        });

        it("should return the URL for the development sell endpoint when isLive() returns false", () => {
            const brokerageProvider = new ConcreteBrokerageProvider();
            process.env.ENV = "development";
            const expectedURI = "https://dev.example.com/sell";
            const uri = brokerageProvider.testGetSellUri();
            expect(uri).toEqual(expectedURI);
        });
    });

    describe("getHistoricalPriceDataUri()", () => {
        it("should return the URL for the production historical price data endpoint when isLive() returns true", () => {
            const brokerageProvider = new ConcreteBrokerageProvider();
            process.env.ENV = "production";
            const expectedURI = "https://prod.example.com/historical-price-data";
            const uri = brokerageProvider.testGetHistoricalPriceDataUri();
            expect(uri).toEqual(expectedURI);
        });

        it("should return the URL for the development historical price data endpoint when isLive() returns false", () => {
            const brokerageProvider = new ConcreteBrokerageProvider();
            process.env.ENV = "development";
            const expectedURI = "https://dev.example.com/historical-price-data";
            const uri = brokerageProvider.testGetHistoricalPriceDataUri();
            expect(uri).toEqual(expectedURI);
        });
    });

    describe("getPositionsUri()", () => {
        it("should return the URL for the production positions endpoint when isLive() returns true", () => {
            const brokerageProvider = new ConcreteBrokerageProvider();
            process.env.ENV = "production";
            const expectedURI = "https://prod.example.com/positions";
            const uri = brokerageProvider.testGetPositionsUri();
            expect(uri).toEqual(expectedURI);
        });

        it("should return the URL for the development positions endpoint when isLive() returns false", () => {
            const brokerageProvider = new ConcreteBrokerageProvider();
            process.env.ENV = "development";
            const expectedURI = "https://dev.example.com/positions";
            const uri = brokerageProvider.testGetPositionsUri();
            expect(uri).toEqual(expectedURI);
        });
    });

    describe("getSecuritiesQueryStringParams()", () => {
        it("should return the query string params for the securities endpoint", () => {
            const brokerageProvider = new ConcreteBrokerageProvider();
            const expectedQueryStringParams = "foo=bar";
            const queryStringParams = brokerageProvider.testGetSecuritiesQueryStringParams();
            expect(queryStringParams).toEqual(expectedQueryStringParams);
        });
    });

    describe("getBuyQueryStringParams()", () => {
        it("should return the query string params for the buy endpoint", () => {
            const brokerageProvider = new ConcreteBrokerageProvider();
            const expectedQueryStringParams = "foo=bar";
            const queryStringParams = brokerageProvider.testGetBuyQueryStringParams({} as any);
            expect(queryStringParams).toEqual(expectedQueryStringParams);
        });
    });

    describe("getSellQueryStringParams()", () => {
        it("should return the query string params for the sell endpoint", () => {
            const brokerageProvider = new ConcreteBrokerageProvider();
            const expectedQueryStringParams = "foo=bar";
            const queryStringParams = brokerageProvider.testGetSellQueryStringParams({} as any);
            expect(queryStringParams).toEqual(expectedQueryStringParams);
        });
    });

    describe("getHistoricalPriceDataQueryStringParams()", () => {
        it("should return the query string params for the historical price data endpoint", () => {
            const brokerageProvider = new ConcreteBrokerageProvider();
            const expectedQueryStringParams = "foo=bar";
            const queryStringParams = brokerageProvider.testGetHistoricalPriceDataQueryStringParams({} as any);
            expect(queryStringParams).toEqual(expectedQueryStringParams);
        });
    });

    describe("getRequestHeaders()", () => {
        it("should return the request headers", () => {
            const brokerageProvider = new ConcreteBrokerageProvider();
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
            const brokerageProvider = new ConcreteBrokerageProvider();
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
            const brokerageProvider = new ConcreteBrokerageProvider();
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
            const brokerageProvider = new ConcreteBrokerageProvider();
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
            const brokerageProvider = new ConcreteBrokerageProvider();
            const expectedHeaders = {
                foo: "bar",
                accept: "application/json",
            };
            const headers = brokerageProvider.testGetHistoricalPriceDataHeaders();
            expect(headers).toEqual(expectedHeaders);
        });
    });
});
