import tradingService from "../../../services/tradingService";

export default async function start_trading() {
    console.log("start_trading");
    await tradingService.startTrading();
}
