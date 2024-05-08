import { TradeManager } from "../../lib/TradeManager";
import ConcreteBrokerageProvider from "./brokerage/ConcreteBrokerageProvider";
import config from "../../config";
import * as utils from "../../lib/utils";
import axios from "axios";
import eventEmitter from "../../lib/eventEmitter";
import { TradeLoopStatus } from "../../types/types";

class TestTradeManager extends TradeManager {
    protected shouldContinue = true;

    public getShouldContinue(): boolean {
        return this.shouldContinue;
    }
}

class TestConcreteBrokerageProvider extends ConcreteBrokerageProvider {}

describe("TradeManager", () => {

    beforeAll(() => {
        // Mock axios.get to return a promise that resolve to an empty object
        jest.spyOn(axios, "get").mockImplementation(() => Promise.resolve({ data: {} }));

        // Mock sleep() to prevent the app from waiting
        jest.spyOn(utils, "sleep").mockImplementation(() => Promise.resolve());

        // Mock eventEmitter.emit() to prevent the app from emitting events
        jest.spyOn(eventEmitter, "emit").mockImplementation(() => true);

        // Mock console.log and console.error to prevent the app from logging
        // console.log = jest.fn();
        // console.error = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("start()", () => {
        it("should call executeTradesOnce() and sleep() once", async () => {
            // Setup
            jest.spyOn(axios, "get").mockImplementation(() => Promise.resolve({ data: [] }));
            const tradeManager = new TestTradeManager(new ConcreteBrokerageProvider(config), config);

            // Spy
            const executeTradesOnceSpy = jest.spyOn(tradeManager, "executeTradesOnce");
            const sleepSpy = jest.spyOn(utils, "sleep")
                .mockImplementation(() => Promise.resolve(tradeManager.stop()));
            const emitSpies = jest.spyOn(eventEmitter, "emit").mockImplementation(() => true);

            // Execute
            await tradeManager.start();

            // Assert
            expect(executeTradesOnceSpy).toHaveBeenCalledTimes(1);
            expect(sleepSpy).toHaveBeenCalledTimes(1);
            expect(sleepSpy).toHaveBeenCalledWith(config.TRADE.TIME_BETWEEN_TRADES_IN_SECONDS * 1000);
            expect(emitSpies).toHaveBeenCalledTimes(3);
            expect(emitSpies).toHaveBeenCalledWith("report_trade_loop_status", { status: TradeLoopStatus.RUNNING });
            expect(emitSpies).toHaveBeenCalledWith("report_trade_loop_status", { status: TradeLoopStatus.STOPPED });
            expect(emitSpies).toHaveBeenCalledWith("report_trade_loop_progress", { progress: 1, securityStatsMap: {} });
        });
    });

    describe("stop()", () => {
        it("should set shouldContinue to false", () => {
            const tradeManager = new TestTradeManager(new ConcreteBrokerageProvider(config), config);
            tradeManager.stop();
            expect(tradeManager.getShouldContinue()).toBe(false);
        });
    });

    describe("setBrokerageProvider()", () => {
        it("should set the brokerage provider", () => {
            const tradeManager = new TestTradeManager(new ConcreteBrokerageProvider(config), config);
            const brokerageProvider = new TestConcreteBrokerageProvider(config);
            tradeManager.setBrokerageProvider(brokerageProvider);
            expect(tradeManager.getBrokerageProvider()).toBeInstanceOf(TestConcreteBrokerageProvider);
        });
    });

    describe("getBrokerageProvider()", () => {
        it("should return the brokerage provider", () => {
            const tradeManager = new TestTradeManager(new ConcreteBrokerageProvider(config), config);
            expect(tradeManager.getBrokerageProvider()).toBeInstanceOf(ConcreteBrokerageProvider);
        });
    });

    describe("setConfig()", () => {
        it("should set the configuration", () => {
            const tradeManager = new TestTradeManager(new ConcreteBrokerageProvider(config), config);
            const newConfig = { ...config };
            newConfig.TRADE.TIME_BETWEEN_TRADES_IN_SECONDS = 10;
            tradeManager.setConfig(newConfig);
            expect(tradeManager.getConfig()).toBe(newConfig);
        });
    });

    describe("getConfig()", () => {
        it("should return the configuration", () => {
            const tradeManager = new TestTradeManager(new ConcreteBrokerageProvider(config), config);
            expect(tradeManager.getConfig()).toBe(config);
        });
    });

    describe("executeTradesOnce()", () => {
        it("should execute trades once", async () => {
            // Setup
            const brokerageProvider = new ConcreteBrokerageProvider(config);
            const tradeManager = new TestTradeManager(brokerageProvider, config);

            // Spy
            const securitiesSpy = jest.spyOn(brokerageProvider, "securities")
                .mockImplementation(() => Promise.resolve([{
                    symbol: "ETH/USD",
                    name: "Ethereum",
                }]));

            // Execute
            await tradeManager.executeTradesOnce();

            // Assert
            expect(securitiesSpy).toHaveBeenCalledTimes(1);
        });

        it("should log an error if compileStatsForSecurity() throws an error", async () => {
            // Setup
            const brokerageProvider = new ConcreteBrokerageProvider(config);
            const tradeManager = new TestTradeManager(brokerageProvider, config);

            // Spy
            const securitiesSpy = jest.spyOn(brokerageProvider, "securities")
                .mockImplementation(() => Promise.resolve([{
                    symbol: "ETH/USD",
                    name: "Ethereum",
                }]));
            const compileStatsForSecuritySpy = jest.spyOn(tradeManager, "compileStatsForSecurity" as keyof TestTradeManager)
                .mockImplementation(() => { throw new Error("Test error"); });

            // Execute. We expect this to throw an error, but we don't want the test to fail.
            await tradeManager.executeTradesOnce().catch(error => {
                expect(error.message).toBe("Test error");
                expect(securitiesSpy).toHaveBeenCalledTimes(1);
                expect(compileStatsForSecuritySpy).toHaveBeenCalledTimes(1);
            });
        });
    });
});
