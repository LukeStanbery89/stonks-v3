import { registerEventListeners } from "../../../loaders/events/eventListeners";
import eventEmitter from "../../../lib/eventEmitter";

jest.mock(
    "../../../subscribers/events/handlers/index.ts",
    jest.fn(() => {
        return {
            mock_handler: jest.fn(),
        };
    }),
    { virtual: true },
);

describe("eventListeners", () => {
    beforeAll(() => {
        // console.log = jest.fn();
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should register event listeners correctly", () => {
        const mockEventEmitter = jest.spyOn(eventEmitter, "on");

        registerEventListeners();

        expect(mockEventEmitter).toHaveBeenCalledTimes(1);
        expect(mockEventEmitter).toHaveBeenCalledWith("mock_handler", expect.any(Function));
    });
});
