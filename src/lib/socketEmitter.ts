import { Server } from "socket.io";

export class SocketEmitter {
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

    public emit(event: string, data?: object) {
        if (this.io) {
            if (data) {
                this.io.emit(event, data);
            } else {
                this.io.emit(event);
            }
        }
    }
}

const socketEmitter = SocketEmitter.getInstance();

export default socketEmitter;
