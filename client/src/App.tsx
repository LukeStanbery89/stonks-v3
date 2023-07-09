import React from "react";
import WebSocketTest from "./components/test/WebSocketTest";
import XHRTest from "./components/test/XHRTest";

const App: React.FC = () => {
    return (
        <div>
            <h1>Hello, World!</h1>
            <XHRTest />
            <WebSocketTest />
        </div>
    );
};

export default App;
