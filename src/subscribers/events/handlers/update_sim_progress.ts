import socketEmitter from "../../../lib/socketEmitter";
import constants from "../../../config/constants.json";
import Logger from "@lukestanbery/ledger";

type PayloadType = {
    progress: number,
};

export default function update_sim_progress(payload: PayloadType) {
    Logger.log(`${constants.EVENTS.UPDATE_SIM_PROGRESS}: ${payload.progress}%`);
    socketEmitter.emit(constants.SOCKET_EVENTS.UPDATE_SIM_PROGRESS, payload);
}
