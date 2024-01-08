import dotenv from "dotenv";
dotenv.config();

export default {
    PORT: process.env.PORT || 3000,
    RATE_LIMITER: {
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // Limit each IP to 100 requests per windowMs
    },
    APCA_API_KEY_ID: process.env.APCA_API_KEY_ID || "",
    APCA_API_SECRET_KEY: process.env.APCA_API_SECRET_KEY || "",
};
