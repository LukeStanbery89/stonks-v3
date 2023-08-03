import my_other_event from "../../../../subscribers/events/handlers/my_other_event";
import eventEmitter from "../../../../lib/eventEmitter";
import { registerEventListeners } from "../../../../loaders/events/eventListeners";

jest.mock("../../../../subscribers/events/handlers/my_other_event", () => ({
    __esModule: true,
    default: jest.fn().mockImplementation((payload) => console.log("payload: ", payload)),
}));

describe("Test myFunction", () => {
    beforeAll(() => {
        console.log = jest.fn();
    });

    beforeEach(() => {
        registerEventListeners();
    });

    afterAll(() => {
        jest.resetModules();
        jest.resetAllMocks();
    });

    it("should call the mocked function", () => {
        // Emit events
        eventEmitter.emit("my_other_event", "my_other_event test");

        // Assert that the mocked function was called
        expect(my_other_event).toHaveBeenCalledWith("my_other_event test");
    });
});
