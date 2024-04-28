import socketEmitter from "../../../lib/socketEmitter";
import constants from "../../../config/constants.json";
import { SecurityStatsMap } from "../../../types/types";

type PayloadType = {
    progress: number,
    securityStatsMap: SecurityStatsMap,
};

export default function report_trade_loop_progress(payload: PayloadType) {
    console.log(constants.EVENTS.REPORT_TRADE_LOOP_PROGRESS, payload);
    socketEmitter.emit(constants.EVENTS.REPORT_TRADE_LOOP_PROGRESS, payload);
    if (payload.progress === 1) {
        socketEmitter.emit(constants.SOCKET_EVENTS.TRADE_LOOP_END, { securityStatsMap: payload.securityStatsMap });
    }
}
