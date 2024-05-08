import socketHandlers from "./handlers";
import Logger from "@lukestanbery/ledger";

const registerSocketEvents = (socket) => {
    // Base socket event registrations
    socket.on("connect_error", (err) => Logger.log("socket connect_error", err));
    socket.on("connect_timeout", () => Logger.log("socket connect_timeout"));
    socket.on("connect_failed", () => Logger.log("socket connect_failed"));
    socket.on("disconnect", () => Logger.log("socket disconnect"));
    socket.on("reconnect", () => Logger.log("socket reconnect"));
    socket.on("reconnect_attempt", () => Logger.log("socket reconnect_attempt"));
    socket.on("reconnecting", () => Logger.log("socket reconnecting"));
    socket.on("reconnect_error", () => Logger.log("socket reconnect_error"));
    socket.on("reconnect_failed", () => Logger.log("socket reconnect_failed"));

    // Additional event registrations
    for (const [event, handler] of Object.entries(socketHandlers)) {
        socket.on(event, handler);
    }

    return socket;
};

export default registerSocketEvents;
