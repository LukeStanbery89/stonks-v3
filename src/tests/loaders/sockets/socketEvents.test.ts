import { registerSocketEvents } from "../../../loaders/sockets/socketEvents";
import { Socket } from "socket.io";
import socketEmitter from "../../../lib/socketEmitter";

// Mock socket handers
jest.mock(
    "../../../subscribers/sockets/handlers/index.ts",
    jest.fn(() => {
        return {
            mock_handler: jest.fn(),
        };
    }),
    { virtual: true },
);
describe("socketEvents", () => {
    let io: any;
    let socket: Socket;
    let mockIoOn: (event: string, handler: (socket: Socket) => void) => void;
    const mockIoEmit = jest.fn();
    const mockSocketOn = jest.fn();

    beforeAll(() => {
        // console.log = jest.fn();
    });

    beforeEach(() => {
        socket = {
            on: mockSocketOn,
        } as unknown as Socket;
        mockIoOn = jest.fn().mockImplementation((event: string, handler: (socket: Socket) => void) => {
            if (event === "connection") {
                handler(socket);
            }
        });
        io = {
            on: mockIoOn,
            emit: mockIoEmit,
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should register socket events", () => {
        registerSocketEvents(io);

        expect(mockIoOn).toHaveBeenCalledWith("connection", expect.any(Function));
        expect(mockSocketOn).toHaveBeenCalledWith("mock_handler", expect.any(Function));
    });

    it("should emit events using socketEmitter", () => {
        // const mockSocketEmit = jest.spyOn(socketEmitter, "emit");

        registerSocketEvents(io);

        // Simulate a connection event
        const connectionHandler = io.on.mock.calls[0][1];
        connectionHandler(socket);

        // Simulate event emission
        const payload = { data: "mock_data" };
        socketEmitter.emit("mock_handler", payload);

        // Assert that the expected events are emitted using socketEmitter
        expect(mockIoEmit).toHaveBeenCalledWith("mock_handler", payload);
        // ...
    });

    // Add more test cases as needed

});
