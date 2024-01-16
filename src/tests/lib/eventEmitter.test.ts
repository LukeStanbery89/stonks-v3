import eventEmitter from "../../lib/eventEmitter";

describe("EventEmitter", () => {
    beforeEach(() => {
        eventEmitter.removeAllListeners();
    });

    it("should emit an event", () => {
        const callback = jest.fn();
        eventEmitter.on("testEvent", callback);
        eventEmitter.emit("testEvent");
        expect(callback).toHaveBeenCalled();
    });

    it("should emit an event with arguments", () => {
        const callback = jest.fn();
        eventEmitter.on("testEvent", callback);
        eventEmitter.emit("testEvent", "arg1", "arg2");
        expect(callback).toHaveBeenCalledWith("arg1", "arg2");
    });

    it("should remove a listener", () => {
        const callback = jest.fn();
        eventEmitter.on("testEvent", callback);
        eventEmitter.removeListener("testEvent", callback);
        eventEmitter.emit("testEvent");
        expect(callback).not.toHaveBeenCalled();
    });

    it("should remove all listeners", () => {
        const callback1 = jest.fn();
        const callback2 = jest.fn();
        eventEmitter.on("testEvent", callback1);
        eventEmitter.on("testEvent", callback2);
        eventEmitter.removeAllListeners("testEvent");
        eventEmitter.emit("testEvent");
        expect(callback1).not.toHaveBeenCalled();
        expect(callback2).not.toHaveBeenCalled();
    });
});
