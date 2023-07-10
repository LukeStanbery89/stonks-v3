import React from "react";
import WebSocketTest from "./components/test/WebSocketTest";
import XHRTest from "./components/test/XHRTest";
import "./styles/app.scss";

const App: React.FC = () => {
    return (
        <div className='container'>
            <h1>Hello, World!</h1>
            <XHRTest />
            <WebSocketTest />
        </div>
    );
};

export default App;
