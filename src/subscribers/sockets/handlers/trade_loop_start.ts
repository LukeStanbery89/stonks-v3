import socketEmitter from "../../../lib/socketEmitter";
import run from "../../../services/tradingService";

export default async function trade_loop_start() {
    console.log("trade_loop_start");
    const securities = await run();
    socketEmitter.emit("trade_loop_end", { message: JSON.stringify(securities) });
}
