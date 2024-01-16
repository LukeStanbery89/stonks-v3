import { Server } from "socket.io";
import emitter, { SocketEmitter } from "../../lib/socketEmitter";

describe("SocketEmitter", () => {
    let socketEmitter: SocketEmitter;
    let io: Server;

    beforeAll(() => {
        console.log = jest.fn();
    });

    beforeEach(() => {
        socketEmitter = emitter;
        io = {} as Server;
        socketEmitter.setServer(io);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should emit an event with data", () => {
        const event = "testEvent";
        const data = { message: "Hello, world!" };
        io.emit = jest.fn();

        socketEmitter.emit(event, data);

        expect(io.emit).toHaveBeenCalledWith(event, data);
    });

    it("should emit an event without data", () => {
        const event = "testEvent";
        io.emit = jest.fn();

        socketEmitter.emit(event);

        expect(io.emit).toHaveBeenCalledWith(event);
    });
});
