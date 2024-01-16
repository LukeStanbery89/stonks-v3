import request from "supertest";
import apiRouter from "../../routes/apiRouter";
import { Router } from "express";
import express from "express";

const app = express();
app.use("/api", apiRouter);

describe("apiRouter", () => {
    it("should respond with status 200 and correct body GET /xhrTest", async () => {
        const res = await request(app).get("/api/xhrTest");
        expect(res.status).toBe(200);
        expect(res.body).toStrictEqual({ message: "XHR data from server" });
    });

    it("should respond with status 404 on unknown routes", async () => {
        const res = await request(app).get("/unknownRoute");
        expect(res.status).toBe(404);
    });
});
