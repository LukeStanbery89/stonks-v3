import { round, sleep } from "../../lib/utils";

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

    describe("round()", () => {
        it("should round a number to the specified number of decimal places", () => {
            expect(round(1.2345, 0)).toEqual(1);
            expect(round(1.2345, 1)).toEqual(1.2);
            expect(round(1.2345, 2)).toEqual(1.23);
            expect(round(1.2345, 3)).toEqual(1.235);
            expect(round(1.2345, 4)).toEqual(1.2345);
            expect(round(1.2345, 5)).toEqual(1.2345);
            expect(round(1.23456789, 4)).toEqual(1.2346);
            expect(round(1.9999, 0)).toEqual(2);
        });
    });
});
