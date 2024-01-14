import React from "react";
import XHRTest from "../components/test/XHRTest";
import WebSocketTest from "../components/test/WebSocketTest";
import ReduxTest from "../components/test/ReduxTest";
import TradeLoopTest from "../components/test/TradeLoopTest";

const Test = () => {
    return (
        <div className='container'>
            <h1>Testing Page</h1>
            <XHRTest />
            <WebSocketTest />
            <ReduxTest />
            <TradeLoopTest />
        </div>
    );
};

export default Test;
