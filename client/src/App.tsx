import React from "react";
import WebSocketTest from "./components/test/WebSocketTest";
import XHRTest from "./components/test/XHRTest";
import { Provider } from "react-redux";
import store from "./store/store";
import ReduxTest from "./components/test/ReduxTest";
import "./styles/app.scss";

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <div className='container'>
                <h1>Hello, World!</h1>
                <XHRTest />
                <WebSocketTest />
                <ReduxTest />
            </div>
        </Provider>
    );
};

export default App;
