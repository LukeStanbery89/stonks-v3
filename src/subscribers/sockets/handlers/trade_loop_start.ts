import socketEmitter from "../../../lib/socketEmitter";
import getBrokerProvider from "../../../services/tradingService";
import { OrderType } from "../../../types/types";

export default async function trade_loop_start(): Promise<void> {
    console.log("trade_loop_start");
    const brokerProvider = getBrokerProvider();
    // const result = await brokerProvider.buy({
    //     type: OrderType.BUY,
    //     symbol: "ETH/USD",
    //     // qty: 0.00415051,
    //     notional: 10.00,
    // });
    let result;
    try {
        result = await brokerProvider.sell({
            type: OrderType.SELL,
            symbol: "ETH/USD",
            qty: 0.00415051,
            // notional: 10.00,
        });
    } catch (error) {
        console.error(error);
        result = { error };
    }
    socketEmitter.emit("trade_loop_end", result);
}
