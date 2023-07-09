const registerSocketEvents = (socket) => {
    // Event registrations
    socket.on("connect_error", () => console.log("socket connect_error"));
    socket.on("connect_timeout", () => console.log("socket connect_timeout"));
    socket.on("connect_failed", () => console.log("socket connect_failed"));
    socket.on("disconnect", () => console.log("socket disconnect"));
    socket.on("reconnect", () => console.log("socket reconnect"));
    socket.on("reconnect_attempt", () => console.log("socket reconnect_attempt"));
    socket.on("reconnecting", () => console.log("socket reconnecting"));
    socket.on("reconnect_error", () => console.log("socket reconnect_error"));
    socket.on("reconnect_failed", () => console.log("socket reconnect_failed"));

    // Additional event registrations go here...

    return socket;
};

export default registerSocketEvents;
