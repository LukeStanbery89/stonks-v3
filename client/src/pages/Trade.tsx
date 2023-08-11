import React from "react";
import ProgressBar from "../components/ProgressBar";
import { BS_BACKGROUND, RootState, SimulationStatus } from "../types/types";
import { useSelector } from "react-redux";
import socketEmitter from "../lib/socketEmitter";

const Trade = () => {
    const {
        simProgress: progress,
        simulationStatus,
    } = useSelector((state: RootState) => state.app);

    const {
        label,
        theme,
        striped,
        animate,
    } = getProgressBarParams(simulationStatus, progress);

    return (
        <div className="container">
            <h1>Trade</h1>
            <h2>Configure Trading Strategy</h2>
            <div className="row gx-5">
                <p>// TODO</p>
            </div>
            <h2>Simulation</h2>
            <div className="row g-1">
                <div className="col-3">
                    <button
                        className="btn btn-primary mb-3"
                        onClick={() => socketEmitter.emit("start_simulation")}>
                            Start Simulation
                    </button>
                </div>
                <div className="col-3">
                    <button
                        disabled={simulationStatus !== SimulationStatus.RUNNING}
                        className="btn btn-primary mb-3"
                        onClick={() => socketEmitter.emit("stop_simulation")}>
                            Stop Simulation
                    </button>
                </div>
            </div>
            <div className="row gx-5">
                <div className="col-12">
                    <ProgressBar progress={progress} label={label} theme={theme} striped={striped} animate={animate} />
                </div>
            </div>
        </div>
    );
};

function getProgressBarParams(simulationStatus: SimulationStatus, progress: number) {
    let label: string;
    let theme: BS_BACKGROUND;
    let striped: boolean;
    let animate: boolean;
    switch (simulationStatus) {
    case SimulationStatus.NOT_STARTED:
        label = "";
        theme = BS_BACKGROUND.BG_PRIMARY;
        striped = false;
        animate = false;
        break;
    case SimulationStatus.RUNNING:
        label = `${progress}%`;
        theme = BS_BACKGROUND.BG_PRIMARY;
        striped = true;
        animate = true;
        break;
    case SimulationStatus.STOPPED:
        label = `STOPPED: ${progress}%`;
        theme = BS_BACKGROUND.BG_WARNING;
        striped = true;
        animate = true;
        break;
    case SimulationStatus.COMPLETE:
        label = "Simulation Complete! 🎉";
        theme = BS_BACKGROUND.BG_SUCCESS;
        striped = false;
        animate = false;
        break;
    }
    return { label, theme, striped, animate };
}

export default Trade;
