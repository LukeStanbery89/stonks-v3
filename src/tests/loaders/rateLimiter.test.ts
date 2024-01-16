import request from "supertest";
import express, { Express } from "express";
import config from "../../config";
import initRateLimiter from "../../loaders/rateLimiter";

describe("Rate Limiter", () => {
    let app: Express;

    beforeAll(() => {
        app = express();
        initRateLimiter(app);
    });

    it("should not return 429 status code when rate limit not exceeded", async () => {
        const agent = request.agent(app);

        // Simulate not exceeding the rate limit
        for (let i = 0; i < config.RATE_LIMITER.max - 1; i++) {
            await agent.get("/api/some-endpoint");
        }

        const response = await agent.get("/api/some-endpoint");
        expect(response.status).not.toBe(429);
    });

    it("should return 429 status code when rate limit exceeded", async () => {
        const agent = request.agent(app);

        // Simulate exceeding the rate limit
        for (let i = 0; i < config.RATE_LIMITER.max; i++) {
            await agent.get("/api/some-endpoint");
        }

        const response = await agent.get("/api/some-endpoint");
        expect(response.status).toBe(429);
    });
});
