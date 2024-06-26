import { Socket } from "socket.io";
import socketEmitter from "../../lib/socketEmitter";
import webSocketEventHandlers from "../../subscribers/sockets/handlers/index";
import Logger from "@lukestanbery/ledger";

export function registerSocketEvents(io: any) {
    Logger.log("Registering WebSocket handlers...");

    io.on("connection", (socket: Socket) => {
        Logger.log("Opening new WebSocket connection");

        // Register WebSocket handlers
        for (const [event, handler] of Object.entries(webSocketEventHandlers)) {
            socket.on(event, handler);
        }

        // Handle socket disconnection
        socket.on("disconnect", () => {
            Logger.log("Socket connection closed");
        });
    });

    // Set the server for the socketEmitter instance
    socketEmitter.setServer(io);
}
