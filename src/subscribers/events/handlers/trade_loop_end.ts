import constants from "../../../config/constants.json";
import socketEmitter from "../../../lib/socketEmitter";
import { SecurityStatsMap } from "../../../types/types";

type PayloadType = {
    securityStatsMap: SecurityStatsMap,
};

export default function trade_loop_end(payload: PayloadType) {
    console.log(constants.SOCKET_EVENTS.TRADE_LOOP_END, payload);
    socketEmitter.emit(constants.SOCKET_EVENTS.TRADE_LOOP_END, payload);
}
