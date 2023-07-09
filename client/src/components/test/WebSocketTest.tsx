import React, { useEffect, useState } from "react";
// import { io, Socket } from "socket.io-client";
import socket from "../../utils/socketEmitter";

const WebSocketTest = () => {
    const [data, setData] = useState<{ message: string }>({ message: "" });

    useEffect(() => {
        // Inside a component or event handler
        socket.emit("myEvent", { data: "WebSocket data from the client" });

        // Handle custom events from the server
        socket.on("update", (receivedData: any) => {
            console.log("Received update:", receivedData);
            setData(receivedData);
        });
    }, []);

    return <div><strong>WebSocket Test</strong>: {data.message}</div>;
};

export default WebSocketTest;
