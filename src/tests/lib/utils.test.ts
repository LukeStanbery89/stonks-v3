import { sleep } from "../../lib/utils";

// We mock the sleep function in the setup file, so let's use the real implementation here
jest.mock("../../lib/utils", () => ({
    ...jest.requireActual("../../lib/utils"),
}));

describe("Utils", () => {
    describe("sleep()", () => {
        it("should pause the program for the specified time", async () => {
            const startTime = Date.now();
            const sleepTime = 1000; // 1 second
            const epsilon = 10; // 10 milliseconds

            await sleep(sleepTime);

            const endTime = Date.now();
            const elapsedTime = endTime - startTime;

            expect(elapsedTime).toBeGreaterThanOrEqual(sleepTime);
            // Note: We add an epsilon to account for the time it takes to execute the code.
            // We do not need to be exact, just close enough, so we allow a small margin of error.
            expect(elapsedTime).toBeLessThan(sleepTime + epsilon);
        });
    });
});
