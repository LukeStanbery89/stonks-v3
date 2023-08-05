import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Trade from "./pages/Trade";
import Test from "./pages/Test";

const Router: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/trade" element={<Trade />} />
            <Route path="/test" element={<Test />} />
        </Routes>
    );
};

export default Router;
