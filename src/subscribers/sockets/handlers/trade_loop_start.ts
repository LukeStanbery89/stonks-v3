import socketEmitter from "../../../lib/socketEmitter";
import getBrokerProvider from "../../../services/tradingService";

export default async function trade_loop_start(): Promise<void> {
    console.log("trade_loop_start");
    const brokerProvider = getBrokerProvider();
    const result = await brokerProvider.securities();
    socketEmitter.emit("trade_loop_end", result);
}
