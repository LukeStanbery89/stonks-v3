import AlpacaProvider from "../lib/brokerage/providers/AlpacaProvider";
import BrokerageProvider from "../lib/brokerage/BrokerageProvider";
import eventEmitter from "../lib/eventEmitter";
import { PriceData, Security } from "../types/types";
import { round } from "../lib/utils";

type SecurityStats = {
    currentPrice: number;
    sumOfSquares: number;
    sampleVariance: number;
    stdDev: number;
    upperBand: number;
    lowerBand: number;
    [symbol: string]: any; // Add index signature
};
type SecurityStatsMap = {
    [symbol: string]: SecurityStatsMap;
};

function getBrokerProvider() {
    return new AlpacaProvider();
}

async function executeTradeLoop(brokerProvider: BrokerageProvider) {
    const TRADE_NOTIONAL = 10;
    const TIME_TO_EVALUATE_IN_MINUTES = 20;

    // Initialize the object to store statistics for each security
    const securityStats: SecurityStatsMap = {};

    // Get the securities available for trading
    const securities: Security[] = await brokerProvider.securities();

    for (let i = 0; i < securities.length; i++) {
        eventEmitter.emit("report_trade_loop_progress", { progress: i / securities.length });

        const security: Security = securities[i];
        // Get the last 20 minutes of bars for the security
        // Set the timestamps in ISO 8601 format with with central time zone offset
        const now = new Date();
        const start = new Date(now.getTime() - TIME_TO_EVALUATE_IN_MINUTES * 60 * 1000).toISOString();
        const end = now.toISOString();

        const bars: PriceData[] = await brokerProvider.historicalPriceData({
            symbol: security.symbol,
            start,
            end,
        });

        // Calculate the 20 minute simple moving average (SMA) using sample mean variance formula
        const sampleMean: number = round(bars.reduce((sum, bar) => sum + bar.close, 0) / bars.length, 2);

        // Calculate the standard deviation of the last 20 minute bars
        const sumOfSquares: number = round(bars.reduce((sum, bar) => sum + Math.pow(bar.close - sampleMean, 2), 0), 2);
        const sampleVariance: number = round(sumOfSquares / (bars.length - 1), 2); // Sample variance, so divide by n - 1
        const stdDev: number = round(Math.sqrt(sampleVariance), 2);

        // Calculate the upper and lower bands
        const upperBand: number = round(sampleMean + (stdDev / 2), 2);
        const lowerBand: number = round(sampleMean - (stdDev / 2), 2);

        // Get the current price
        const currentPrice = bars[bars.length - 1].close;

        // Write the statistics to the object
        securityStats[security.symbol] = {
            currentPrice,
            sumOfSquares,
            sampleVariance,
            stdDev,
            upperBand,
            lowerBand,
            bars,
        } as SecurityStats;

        // If the current price is above the upper band, liquidate the position
        if (currentPrice > upperBand) {
            console.log("Liquidating position for security: ", security.symbol);
            // await brokerProvider.sell({
            //     type: OrderType.SELL,
            //     symbol: security.symbol,
            //     qty: 1,
            // });
        }

        // If the current price is below the lower band, buy the security
        else if (currentPrice < lowerBand) {
            console.log("Buying position for security: ", security.symbol);
            // await brokerProvider.buy({
            //     type: OrderType.BUY,
            //     symbol: security.symbol,
            //     notional: TRADE_NOTIONAL,
            // });
        }
    }

    console.log(securityStats);

    eventEmitter.emit("report_trade_loop_progress", { progress: 1 });

    return securityStats;
}

export {
    getBrokerProvider,
    executeTradeLoop,
};
