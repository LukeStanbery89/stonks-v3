import { sleep } from "../../lib/utils";

describe("Utils", () => {
    describe("sleep()", () => {
        it("should pause the program for the specified time", async () => {
            const startTime = Date.now();
            const sleepTime = 1000; // 1 second

            await sleep(sleepTime);

            const endTime = Date.now();
            const elapsedTime = endTime - startTime;

            expect(elapsedTime).toBeGreaterThanOrEqual(sleepTime);
        });
    });
});
