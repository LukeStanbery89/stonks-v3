import eventEmitter from "../../../lib/eventEmitter";
import simulationService from "../../../services/simulationService";
import { SimulationStatus } from "../../../types/types";

export default async function start_simulation() {
    console.log("start_simulation");
    eventEmitter.emit("update_sim_status", { simulationStatus: SimulationStatus.RUNNING });
    await simulationService.start();
}
