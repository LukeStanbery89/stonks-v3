import socketEmitter from "../../../lib/socketEmitter";
import run from "../../../services/tradingService";

export default async function trade_loop_start(): Promise<void> {
    console.log("trade_loop_start");
    const securities: object = await run();
    socketEmitter.emit("trade_loop_end", securities);
}
