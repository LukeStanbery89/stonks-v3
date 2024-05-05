import tradeService from "../../../services/tradingService";
import constants from "../../../config/constants.json";
import Logger from "../../../lib/Logger";

export default async function trade_loop_start(): Promise<void> {
    Logger.log(constants.SOCKET_EVENTS.TRADE_LOOP_END);
    tradeService.start();
}
