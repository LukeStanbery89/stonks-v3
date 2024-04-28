import socketEmitter from "../../../lib/socketEmitter";
import constants from "../../../config/constants.json";

type PayloadType = {
    progress: number,
};

export default function update_sim_progress(payload: PayloadType) {
    console.log(`${constants.EVENTS.UPDATE_SIM_PROGRESS}: ${payload.progress}%`);
    socketEmitter.emit(constants.SOCKET_EVENTS.UPDATE_SIM_PROGRESS, payload);
}
