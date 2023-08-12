import socketHandlers from "./handlers";

const registerSocketEvents = (socket) => {
    // Base socket event registrations
    socket.on("connect_error", (err) => console.log("socket connect_error", err));
    socket.on("connect_timeout", () => console.log("socket connect_timeout"));
    socket.on("connect_failed", () => console.log("socket connect_failed"));
    socket.on("disconnect", () => console.log("socket disconnect"));
    socket.on("reconnect", () => console.log("socket reconnect"));
    socket.on("reconnect_attempt", () => console.log("socket reconnect_attempt"));
    socket.on("reconnecting", () => console.log("socket reconnecting"));
    socket.on("reconnect_error", () => console.log("socket reconnect_error"));
    socket.on("reconnect_failed", () => console.log("socket reconnect_failed"));

    // Additional event registrations
    for (const [event, handler] of Object.entries(socketHandlers)) {
        socket.on(event, handler);
    }

    return socket;
};

export default registerSocketEvents;
