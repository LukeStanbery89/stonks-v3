import request from "supertest";
import express from "express";
import routes from "../../routes";
import path from "path";

const app = express();
app.use(express.static(path.join(__dirname, "../../../client/build")));
app.use(routes);

describe("router", () => {
    it("should respond with status 200 and correct body GET /xhrTest", async () => {
        const res = await request(app).get("/");
        expect(res.status).toBe(200);
        expect(res.text).toContain("<title>STONKS v3</title>");
    });

    it("should respond with status 404 on unknown routes", async () => {
        const res = await request(app).get("/unknownRoute");
        expect(res.status).toBe(404);
    });
});
