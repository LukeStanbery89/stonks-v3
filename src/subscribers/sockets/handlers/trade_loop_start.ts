import socketEmitter from "../../../lib/socketEmitter";
import { executeTradeLoop, getBrokerProvider } from "../../../services/tradingService";

export default async function trade_loop_start(): Promise<void> {
    console.log("trade_loop_start");
    const brokerProvider = getBrokerProvider();
    let result;
    try {
        // const result = await brokerProvider.buy({
        //     type: OrderType.BUY,
        //     symbol: "ETH/USD",
        //     // qty: 0.00415051,
        //     notional: 10.00,
        // });
        // result = await brokerProvider.sell({
        //     type: OrderType.SELL,
        //     symbol: "ETH/USD",
        //     qty: 0.00415051,
        //     // notional: 10.00,
        // });
        // result = await brokerProvider.securities();
        // result = await brokerProvider.historicalPriceData({
        //     symbol: "ETH/USD",
        //     start: "2024-01-01T00:00:00.000Z",
        //     end: "2024-01-01T00:01:00.000Z",
        //     limit: 1000,
        // });
        result = await executeTradeLoop(brokerProvider);
    } catch (error) {
        console.error(error);
        result = { error };
    }
    socketEmitter.emit("trade_loop_end", result);
}
