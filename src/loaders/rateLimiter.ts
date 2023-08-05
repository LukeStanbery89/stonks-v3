import { Express } from "express";
import rateLimit from "express-rate-limit";
import config from "../config";

const limiter = rateLimit(config.RATE_LIMITER);

export default function initRateLimiter(app: Express) {
    app.use(limiter);
}
