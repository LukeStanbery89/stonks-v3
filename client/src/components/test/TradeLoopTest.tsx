import React, { useState, useEffect } from "react";
import socketEmitter from "../../lib/socketEmitter";
import { RootState } from "../../types/types";
import { useSelector } from "react-redux";
import ProgressBar from "../ProgressBar";

const TRADE_LOOP_START = "trade_loop_start";
const TRADE_LOOP_UPDATE = "trade_loop_update";
const TRADE_LOOP_END = "trade_loop_end";

const resultStyle = {
    background: "#EEE",
    borderRadius: "5px",
    padding: "10px",
    border: "1px solid #666",
};

const WebSocketTest = () => {
    const [data, setData] = useState<{ message: string }>({ message: "" });
    const tradeLoopProgress = useSelector((state: RootState) => state.app.tradeLoopProgress);

    function emitTestWebSocketEvent() {
        setData({ message: "Emitting event..." });
        socketEmitter.emit(TRADE_LOOP_START);
    }

    useEffect(() => {
        // Define the event listener function
        const handleUpdate = (receivedData: any) => {
            console.log("trade loop update from server:", receivedData);
            setData(receivedData);
        };

        // Register the event listener only once
        socketEmitter.on(TRADE_LOOP_UPDATE, handleUpdate);
        socketEmitter.on(TRADE_LOOP_END, handleUpdate);

        // Clean up the event listener when the component is unmounted
        return () => {
            socketEmitter.off(TRADE_LOOP_END, handleUpdate);
            socketEmitter.off(TRADE_LOOP_END, handleUpdate);
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
