import React from "react";
import XHRTest from "../components/test/XHRTest";
import WebSocketTest from "../components/test/WebSocketTest";
import ReduxTest from "../components/test/ReduxTest";

const Test = () => {
    return (
        <div className='container'>
            <h1>Hello, World!</h1>
            <XHRTest />
            <WebSocketTest />
            <ReduxTest />
        </div>
    );
};

export default Test;
