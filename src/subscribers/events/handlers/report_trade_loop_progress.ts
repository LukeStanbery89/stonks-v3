import socketEmitter from "../../../lib/socketEmitter";

export default function report_trade_loop_progress(payload: any) {
    console.log("report_trade_loop_progress", payload);
    socketEmitter.emit("report_trade_loop_progress", payload);
}
