import React from "react";
import Router from "./Router";
import NavBar from "./components/NavBar";

const App = () => {
    return (
        <>
            <NavBar />
            <div className="container">
                <Router />
            </div>
        </>
    );
};

export default App;
