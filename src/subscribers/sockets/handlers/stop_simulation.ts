import eventEmitter from "../../../lib/eventEmitter";
import simulationService from "../../../services/simulationService";
import { SimulationStatus } from "../../../types/types";
import constants from "../../../config/constants.json";
import Logger from "@lukestanbery/ledger";

export default function stop_simulation() {
    Logger.log(constants.SOCKET_EVENTS.STOP_SIMULATION);
    eventEmitter.emit(constants.EVENTS.UPDATE_SIM_STATUS, { simulationStatus: SimulationStatus.STOPPED });
    simulationService.stop();
}
