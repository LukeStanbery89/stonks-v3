import socketEmitter from "../../../lib/socketEmitter";
import { SimulationStatus } from "../../../types/types";

export default function update_sim_status(payload: {simulationStatus: SimulationStatus}) {
    console.log("update_sim_status:", SimulationStatus[payload.simulationStatus]);
    socketEmitter.emit("update_sim_status", payload);
}
