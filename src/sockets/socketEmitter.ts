import { Server } from "socket.io";

class SocketEmitter {
    private static instance: SocketEmitter;
    private io?: Server;

    private constructor() {
        // Nothing needed here
    }

    public static getInstance(): SocketEmitter {
        if (!SocketEmitter.instance) {
            SocketEmitter.instance = new SocketEmitter();
        }
        return SocketEmitter.instance;
    }

    public setServer(io: Server) {
        this.io = io;
    }

    public emit(event: string, data: any) {
        if (this.io) {
            this.io.emit(event, data);
        }
    }
}

const socketEmitter = SocketEmitter.getInstance();

export default socketEmitter;
