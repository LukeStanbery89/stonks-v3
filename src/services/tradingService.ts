import AlpacaProvider from "../lib/brokerage/providers/AlpacaProvider";
import BrokerageProvider from "../lib/brokerage/BrokerageProvider";
import eventEmitter from "../lib/eventEmitter";
import { Decision, PriceData, Security, SecurityStats, SecurityStatsMap } from "../types/types";
import { calculateSampleMean, calculateSlope, calculateStdDev } from "../lib/math";

function getBrokerProvider() {
    return new AlpacaProvider();
}

async function executeTradeLoop(brokerageProvider: BrokerageProvider) {
    // TODO: move to config file
    const TRADE_NOTIONAL = 10;

    // Initialize the object to store statistics for each security
    const securityStats: SecurityStatsMap = {};

    // Get the securities available for trading
    const securities: Security[] = await brokerageProvider.securities();

    for (let i = 0; i < securities.length; i++) {
        eventEmitter.emit("report_trade_loop_progress", { progress: i / securities.length });

        const security: Security = securities[i];

        // Determine if security is owned
        securityStats[security.symbol] = await compileStatsForSecurity(brokerageProvider, security);
    }

    console.log(securityStats);

    eventEmitter.emit("report_trade_loop_progress", { progress: 1 });

    return securityStats;

}

async function compileStatsForSecurity(brokerageProvider: BrokerageProvider, security: Security): Promise<SecurityStats> {
    // TODO move to config file
    const TIME_TO_EVALUATE_IN_MINUTES = 20;

    const symbol = security.symbol.replace("/", "");
    const isOwned: boolean = await brokerageProvider.isSecurityOwned(symbol);

    // Get the last 20 minutes of bars for the security
    // Set the timestamps in ISO 8601 format with with central time zone offset
    const now = new Date();
    const start = new Date(now.getTime() - TIME_TO_EVALUATE_IN_MINUTES * 60 * 1000).toISOString();
    const end = now.toISOString();

    const bars: PriceData[] = await brokerageProvider.historicalPriceData({
        symbol: security.symbol,
        start,
        end,
    });

    // Get the current price
    const currentPrice: number = bars[bars.length - 1].close;

    // Calculate the 20 minute simple moving average (SMA) using sample mean variance formula
    const sampleMean: number = calculateSampleMean(bars);

    // Calculate the standard deviation of the last 20 minute bars
    const { stdDev, sumOfSquares, sampleVariance, upperBand, lowerBand } = calculateStdDev(bars, sampleMean);

    // Calculate the slope of the trendline
    const slope: number = calculateSlope(bars);

    // Make a decision based on the current price and the slope of the trendline
    const { decision, decisionReason } = renderDecision(isOwned, currentPrice, upperBand, slope, lowerBand);

    // Write the statistics to the object
    const securityStats: SecurityStats = {
        currentPrice,
        sampleMean,
        sumOfSquares,
        sampleVariance,
        stdDev,
        upperBand,
        lowerBand,
        slope,
        isOwned,
        decision,
        decisionReason,
        bars,
    };

    return securityStats;
}

// TODO: Replace this with real trading strategy
function renderDecision(isOwned: boolean, currentPrice: number, upperBand: number, slope: number, lowerBand: number): { decision: Decision; decisionReason: string; } {
    let decision: Decision;
    let decisionReason: string;
    if (isOwned) {
        if (currentPrice > upperBand && slope > 0) {
            decision = Decision.HOLD;
            decisionReason = "Price is high, but could go higher. Hold.";
        } else if (currentPrice > upperBand && slope <= 0) {
            decision = Decision.SELL;
            decisionReason = "Sell high";
        } else if (currentPrice < lowerBand && slope > 0) {
            decision = Decision.BUY;
            decisionReason = "Buy low";
        } else if (currentPrice < lowerBand && slope <= 0) {
            decision = Decision.SELL;
            decisionReason = "Price is low and declining. Cut losses.";
        } else if (slope <= 0) {
            decision = Decision.SELL;
            decisionReason = "Trend is down. Cut losses.";
        } else {
            decision = Decision.HOLD;
            decisionReason = "Price is stagnant. Hold.";
        }
    } else {
        if (currentPrice > upperBand && slope > 0) {
            decision = Decision.HOLD;
            decisionReason = "Price is rising, but could drop again. Avoid buying high.";
        } else if (currentPrice > upperBand && slope <= 0) {
            decision = Decision.HOLD;
            decisionReason = "Price is high and declining. Wait for price drop.";
        } else if (currentPrice < lowerBand && slope > 0) {
            decision = Decision.BUY;
            decisionReason = "Buy low";
        } else if (currentPrice < lowerBand && slope <= 0) {
            decision = Decision.HOLD;
            decisionReason = "Price is low and declining. Wait for positive trend before buying.";
        } else if (slope <= 0) {
            decision = Decision.HOLD;
            decisionReason = "Trend is down. Wait for positive trend before buying.";
        } else {
            decision = Decision.HOLD;
            decisionReason = "Price is stagnant. Wait for positive trend before buying.";
        }
    }
    return { decision, decisionReason };
}

export {
    getBrokerProvider,
    executeTradeLoop,
};
