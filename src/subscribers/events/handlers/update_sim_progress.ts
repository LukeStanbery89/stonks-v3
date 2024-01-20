import socketEmitter from "../../../lib/socketEmitter";
import constants from "../../../config/constants.json";

export default function update_sim_progress(payload: { progress: number; }) {
    console.log(`${constants.EVENTS.UPDATE_SIM_PROGRESS}: ${payload.progress}%`);
    socketEmitter.emit(constants.SOCKET_EVENTS.UPDATE_SIM_PROGRESS, payload);
}
