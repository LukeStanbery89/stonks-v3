import socketEmitter from "../../../lib/socketEmitter";
import { SimulationStatus } from "../../../types/types";
import constants from "../../../config/constants.json";
import Logger from "@lukestanbery/ledger";

type PayloadType = {
    simulationStatus: SimulationStatus,
};

export default function update_sim_status(payload: PayloadType) {
    Logger.log(constants.EVENTS.UPDATE_SIM_STATUS, SimulationStatus[payload.simulationStatus]);
    socketEmitter.emit(constants.SOCKET_EVENTS.UPDATE_SIM_STATUS, payload);
}
