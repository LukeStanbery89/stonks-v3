import React, { useState, useEffect } from "react";
import socketEmitter from "../../lib/socketEmitter";
import constants from "../../config/constants.json";
import Logger from "@lukestanbery/ledger";

const WebSocketTest = () => {
    const [data, setData] = useState<{ message: string }>({ message: "" });

    function emitTestWebSocketEvent() {
        setData({ message: "Emitting event..." });
        socketEmitter.emit(constants.SOCKET_EVENTS.MY_WEBSOCKET_EVENT, { data: "WebSocket data from the client" });
    }

    useEffect(() => {
        // Define the event listener function
        const handleUpdate = (receivedData: any) => {
            Logger.log("response from WebSocket:", receivedData);
            setData(receivedData);
        };

        // Register the event listener only once
        socketEmitter.on("update", handleUpdate);

        // Clean up the event listener when the component is unmounted
        return () => {
            socketEmitter.off("update", handleUpdate);
        };
    }, []);

    return (
        <div>
            <button type='button' className='btn btn-primary' onClick={emitTestWebSocketEvent}>Test WebSockets</button>
            <p>WebSocket Result: {data.message}</p>
        </div>
    );
};

export default WebSocketTest;
