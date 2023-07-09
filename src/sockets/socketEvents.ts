import { Socket } from "socket.io";
import socketEmitter from "./socketEmitter";

export function registerSocketEvents(io: any) {
    io.on("connection", (socket: Socket) => {
        console.log("New socket connection");

        // Handle custom events from the client
        socket.on("myEvent", (data: any) => {
            console.log("WebSocket data from client:", data);

            // Process the data and emit updates or perform any other actions
            // You can define your own logic here based on your application's requirements

            // Emit updates to the client using the socketEmitter instance
            socketEmitter.emit("update", { message: "Websocket data from server" });
        });

        // Handle socket disconnection
        socket.on("disconnect", () => {
            console.log("Socket connection closed");
        });
    });

    // Set the server for the socketEmitter instance
    socketEmitter.setServer(io);
}
