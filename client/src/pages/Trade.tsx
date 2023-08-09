import React from "react";
import ProgressBar from "../components/ProgressBar";
import { RootState } from "../store/types";
import { useSelector } from "react-redux";
import socketEmitter from "../utils/socketEmitter";

const Trade = () => {
    const {
        simProgress,
        simInProgress,
    } = useSelector((state: RootState) => state.app);

    return (
        <div className="container">
            <h1>Trade</h1>
            <div className="row gx-5">
                <div className="col-12">
                    <ProgressBar progress={simProgress} label={simInProgress ? "Simulation running..." : ""} />
                </div>
            </div>
            <div className="row g-1">
                <div className="col-2">
                    <button className="btn btn-primary m-2" onClick={() => socketEmitter.emit("start_trading")}>Start</button>
                </div>
                <div className="col-2">
                    <button className="btn btn-primary m-2" onClick={() => socketEmitter.emit("stop_trading")}>Stop</button>
                </div>
            </div>
        </div>
    );
};

export default Trade;
