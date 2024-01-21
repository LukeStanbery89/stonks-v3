import tradeService from "../../../services/tradingService";
import constants from "../../../config/constants.json";
import eventEmitter from "../../../lib/eventEmitter";

export default async function trade_loop_start(): Promise<void> {
    console.log(constants.SOCKET_EVENTS.TRADE_LOOP_END);
    let result;
    try {
        await tradeService.start();
    } catch (error) {
        console.error(error);
        result = { error };
    }
    eventEmitter.emit(constants.SOCKET_EVENTS.TRADE_LOOP_END, result);
}
