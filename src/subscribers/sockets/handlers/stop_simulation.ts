import eventEmitter from "../../../lib/eventEmitter";
import simulationService from "../../../services/simulationService";
import { SimulationStatus } from "../../../types/types";

export default function stop_simulation() {
    console.log("stop_simulation");
    eventEmitter.emit("update_sim_status", { simulationStatus: SimulationStatus.STOPPED });
    simulationService.stop();
}
