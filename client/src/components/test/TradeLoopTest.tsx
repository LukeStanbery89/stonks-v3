import React, { useState, useEffect } from "react";
import socketEmitter from "../../lib/socketEmitter";
import { RootState } from "../../types/types";
import { useSelector } from "react-redux";
import ProgressBar from "../ProgressBar";
import constants from "../../config/constants.json";
import Logger from "@lukestanbery/ledger";

const resultStyle = {
    background: "#EEE",
    borderRadius: "5px",
    padding: "10px",
    border: "1px solid #666",
    maxHeight: "500px",
};

const WebSocketTest = () => {
    const [data, setData] = useState<{ message: string }>({ message: "" });
    const tradeLoopProgress = useSelector((state: RootState) => state.app.tradeLoopProgress);

    function emitTestWebSocketEvent() {
        setData({ message: "Emitting event..." });
        socketEmitter.emit(constants.SOCKET_EVENTS.TRADE_LOOP_START);
    }

    useEffect(() => {
        // Define the event listener function
        const handleUpdate = (receivedData: any) => {
            Logger.log("trade loop update from server:", receivedData);
            setData(receivedData);
        };

        // Register the event listener only once
        socketEmitter.on(constants.SOCKET_EVENTS.TRADE_LOOP_UPDATE, handleUpdate);
        socketEmitter.on(constants.SOCKET_EVENTS.TRADE_LOOP_END, handleUpdate);

        // Clean up the event listener when the component is unmounted
        return () => {
            socketEmitter.off(constants.SOCKET_EVENTS.TRADE_LOOP_END, handleUpdate);
            socketEmitter.off(constants.SOCKET_EVENTS.TRADE_LOOP_END, handleUpdate);
        };
    }, []);

    return (
        <div>
            <button type='button' className='btn btn-primary' onClick={emitTestWebSocketEvent}>Test Trade</button>
            <ProgressBar progress={tradeLoopProgress}/>
            <p>Trade Result:</p>
            <pre style={resultStyle}>{JSON.stringify(data, null, 4)}</pre>
        </div>
    );
};

export default WebSocketTest;
