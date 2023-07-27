import React from "react";
import XHRTest from "./components/test/XHRTest";
import WebSocketTest from "./components/test/WebSocketTest";

const App = () => {
    return (
        <div className='container'>
            <h1>Hello, World!</h1>
            <XHRTest />
            <WebSocketTest />
        </div>
    );
};

export default App;
