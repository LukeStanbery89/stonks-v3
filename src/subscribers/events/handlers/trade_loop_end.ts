import constants from "../../../config/constants.json";
import socketEmitter from "../../../lib/socketEmitter";

export default function trade_loop_end(payload: any) {
    console.log(constants.SOCKET_EVENTS.TRADE_LOOP_END, payload);
    socketEmitter.emit(constants.SOCKET_EVENTS.TRADE_LOOP_END, payload);
}
