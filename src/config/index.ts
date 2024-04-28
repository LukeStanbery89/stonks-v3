import dotenv from "dotenv";
dotenv.config();

export default {
    PORT: process.env.PORT || 3000,
    RATE_LIMITER: {
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // Limit each IP to 100 requests per windowMs
    },
    ALPACA: {
        APCA_API_KEY_ID: process.env.APCA_API_KEY_ID || "",
        APCA_API_SECRET_KEY: process.env.APCA_API_SECRET_KEY || "",
        HISTORICAL_PRICE_DATA_TIME_FRAME: "1Min",
        BUY_ORDER_FEE_PERCENTAGE: 0.03,
        SELL_ORDER_FEE_PERCENTAGE: 0.003,
    },
    TRADE: {
        NOTIONAL: 100,
        TIME_TO_EVALUATE_IN_MINUTES: 20,
        DEFAULT_LIMIT: 1000,
        TIME_BETWEEN_TRADES_IN_SECONDS: 60,
        BUY_SLOPE_THRESHOLD: 0.1,
        SELL_SLOPE_THRESHOLD: -0.1,
    },
};
