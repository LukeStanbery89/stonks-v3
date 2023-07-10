import { Socket } from "socket.io";
import socketEmitter from "./socketEmitter";
import webSocketEventHandlers from "../../subscribers/sockets/index";

export function registerSocketEvents(io: any) {
    console.log("Registering WebSocket handlers...");

    io.on("connection", (socket: Socket) => {
        console.log("Opening new WebSocket connection");

        // Register WebSocket handlers
        for (const [event, handler] of Object.entries(webSocketEventHandlers)) {
            socket.on(event, handler);
        }

        // Handle socket disconnection
        socket.on("disconnect", () => {
            console.log("Socket connection closed");
        });
    });

    // Set the server for the socketEmitter instance
    socketEmitter.setServer(io);
}
