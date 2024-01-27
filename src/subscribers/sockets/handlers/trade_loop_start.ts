import tradeService from "../../../services/tradingService";
import constants from "../../../config/constants.json";

export default async function trade_loop_start(): Promise<void> {
    console.log(constants.SOCKET_EVENTS.TRADE_LOOP_END);
    tradeService.start();
}
