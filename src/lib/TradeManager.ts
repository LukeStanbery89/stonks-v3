import { Config } from "../config";
import {
    Decision,
    OrderType,
    Position,
    PriceData,
    Security,
    SecurityStats,
    SecurityStatsMap,
    TradeLoopStatus,
} from "../types/types";
import BrokerageProvider from "./brokerage/BrokerageProvider";
import eventEmitter from "./eventEmitter";
import { calculateSampleMean, calculateSlope, calculateStdDev } from "./math";
import { sleep } from "./utils";
import constants from "../config/constants.json";

export class TradeManager {
    protected shouldContinue = false;
    private brokerageProvider: BrokerageProvider;
    private config: Config;

    constructor(brokerageProvider: BrokerageProvider, config: Config) {
        this.brokerageProvider = brokerageProvider;
        this.config = config;
    }

    /**
     * Starts the trade loop.
     *
     * @returns { Promise<void> }
     */
    public async start() {
        this.shouldContinue = true;
        eventEmitter.emit(constants.EVENTS.REPORT_TRADE_LOOP_STATUS, { status: TradeLoopStatus.RUNNING });
        while(this.shouldContinue) {
            await this.executeTradesOnce();
            await sleep(this.config.TRADE.TIME_BETWEEN_TRADES_IN_SECONDS * 1000);
        }
        eventEmitter.emit(constants.EVENTS.REPORT_TRADE_LOOP_STATUS, { status: TradeLoopStatus.STOPPED });
    }

    /**
     * Stops the trade loop.
     *
     * @returns { void }
     */
    public stop(): void {
        this.shouldContinue = false;
    }

    /**
     * Sets the brokerage provider.
     *
     * @param brokerageProvider Brokerage provider
     * @returns { void }
     */
    public setBrokerageProvider(brokerageProvider: BrokerageProvider): void {
        this.brokerageProvider = brokerageProvider;
    }

    /**
     * Gets the brokerage provider.
     *
     * @returns { BrokerageProvider }
     */
    public getBrokerageProvider(): BrokerageProvider {
        return this.brokerageProvider;
    }

    /**
     * Sets the configuration.
     *
     * @param config Configuration
     * @returns { void }
     */
    public setConfig(config: Config): void {
        this.config = config;
    }

    /**
     * Gets the configuration.
     *
     * @returns { Config }
     */
    public getConfig(): Config {
        return this.config;
    }

    /**
     * Executes a single iteration of the trade loop.
     *
     * @returns { Promise<SecurityStatsMap> }
     */
    public async executeTradesOnce(): Promise<SecurityStatsMap> {
        const securityStatsMap: SecurityStatsMap = {};

        // Get the securities available for trading
        const securities: Security[] = await this.brokerageProvider.securities();

        // Get positions
        const positions: Position[] = await this.brokerageProvider.positions();

        for (let i = 0; i < securities.length; i++) {
            // Report progress
            eventEmitter.emit(constants.EVENTS.REPORT_TRADE_LOOP_PROGRESS, { progress: i / securities.length });

            const security: Security = securities[i];
            console.log("Evaluating security:", security.symbol);

            // Find the current position for this security
            // FIXME: Refactor BrokerageProvider.positions() to return a map of positions for faster lookup
            const position = positions.find((position) => position.symbol === security.symbol);

            let securityStats: SecurityStats;
            try {
                // Gather stats for this security
                securityStats = await this.compileStatsForSecurity(security, position);

            } catch (error) {
                console.error("error compiling stats for security. Skipping...", error);
                continue;
            }

            // Take action based on the decision
            try {
                switch (securityStats.decision) {
                case Decision.BUY:
                    // TODO: Add a check to see if we have enough buying power to buy the security
                    console.log("Decision: Buy");
                    await this.brokerageProvider.buy({
                        type: OrderType.BUY,
                        symbol: security.symbol,
                        notional: this.config.TRADE.NOTIONAL,
                    });
                    break;
                case Decision.SELL:
                    console.log("Decision: Sell");
                    await this.brokerageProvider.liquidate(security.symbol);
                    break;
                default:
                    console.log("Decision: Hold");
                }
            } catch (error) {
                console.error("error buying security. Skipping...", error);
                continue;
            }

            // Add the current security stats to the map
            securityStatsMap[security.symbol] = securityStats;
        }

        console.log(securityStatsMap);

        // Report 100% progress
        eventEmitter.emit(constants.EVENTS.REPORT_TRADE_LOOP_PROGRESS, { progress: 1 });

        // Report the stats for this iteration
        return securityStatsMap;
    }

    private async compileStatsForSecurity(security: Security, position?: Position): Promise<SecurityStats> {
        const symbol = security.symbol.replace("/", "");
        const isOwned: boolean = await this.brokerageProvider.isSecurityOwned(symbol);

        // Get the last n minutes of bars for the security
        // Set the timestamps in ISO 8601 format with with central time zone offset
        const now = new Date();
        const start = new Date(now.getTime() - this.config.TRADE.TIME_TO_EVALUATE_IN_MINUTES * 60 * 1000).toISOString();
        const end = now.toISOString();

        const bars: PriceData[] = await this.brokerageProvider.historicalPriceData({
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
        const { decision, decisionReason } = renderDecision(isOwned, currentPrice, upperBand, slope, lowerBand, this.config);

        // Calculate the approximate fees for buying or selling the security
        const approxFees = await this.calculateFeesForOrder(decision, security, currentPrice, position);

        // Write the statistics to the object
        const securityStats: SecurityStats = {
            currentPrice,
            approxFees,
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

    private async calculateFeesForOrder(decision: Decision, security: Security, currentPrice: number, position?: Position) {
        let approxFees = 0;
        if (decision === Decision.BUY) {
            approxFees = this.brokerageProvider.calculateFeesForOrder({
                type: OrderType.BUY,
                symbol: security.symbol,
                notional: this.config.TRADE.NOTIONAL,
            }, currentPrice);
        } else if (decision === Decision.SELL) {
            if (!position) {
                throw new Error("Cannot calculate fees for selling a security without a position");
            }
            approxFees = this.brokerageProvider.calculateFeesForOrder({
                type: OrderType.SELL,
                symbol: security.symbol,
                qty: position.qty,
            }, currentPrice);
        }
        return approxFees;
    }
}

// TODO: Figure out how to generalize this into a strategy pattern
function renderDecision(isOwned: boolean, currentPrice: number, upperBand: number, slope: number, lowerBand: number, config: Config): { decision: Decision; decisionReason: string; } {
    let decision: Decision;
    let decisionReason: string;
    if (isOwned) {
        if (currentPrice > upperBand && slope > config.TRADE.BUY_SLOPE_THRESHOLD) {
            decision = Decision.HOLD;
            decisionReason = "Price is high, but could go higher. Hold.";
        } else if (currentPrice > upperBand && slope <= config.TRADE.SELL_SLOPE_THRESHOLD) {
            decision = Decision.SELL;
            decisionReason = "Sell high";
        } else if (currentPrice < lowerBand && slope > config.TRADE.BUY_SLOPE_THRESHOLD) {
            decision = Decision.BUY;
            decisionReason = "Buy low";
        } else if (currentPrice < lowerBand && slope <= config.TRADE.SELL_SLOPE_THRESHOLD) {
            decision = Decision.SELL;
            decisionReason = "Price is low and declining. Cut losses.";
        } else if (slope <= config.TRADE.SELL_SLOPE_THRESHOLD) {
            decision = Decision.SELL;
            decisionReason = "Trend is down. Cut losses.";
        } else {
            decision = Decision.HOLD;
            decisionReason = "Price is stagnant. Hold.";
        }
    } else {
        if (currentPrice > upperBand && slope > config.TRADE.BUY_SLOPE_THRESHOLD) {
            decision = Decision.HOLD;
            decisionReason = "Price is rising, but could drop again. Avoid buying high.";
        } else if (currentPrice > upperBand && slope <= config.TRADE.SELL_SLOPE_THRESHOLD) {
            decision = Decision.HOLD;
            decisionReason = "Price is high and declining. Wait for price drop.";
        } else if (currentPrice < lowerBand && slope > config.TRADE.BUY_SLOPE_THRESHOLD) {
            decision = Decision.BUY;
            decisionReason = "Buy low";
        } else if (currentPrice < lowerBand && slope <= config.TRADE.SELL_SLOPE_THRESHOLD) {
            decision = Decision.HOLD;
            decisionReason = "Price is low and declining. Wait for positive trend before buying.";
        } else if (slope <= config.TRADE.SELL_SLOPE_THRESHOLD) {
            decision = Decision.HOLD;
            decisionReason = "Trend is down. Wait for positive trend before buying.";
        } else {
            decision = Decision.HOLD;
            decisionReason = "Price is stagnant. Wait for positive trend before buying.";
        }
    }
    return { decision, decisionReason };
}
