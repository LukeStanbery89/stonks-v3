import tradingService from "../../../services/tradingService";

export default function stop_trading() {
    console.log("stop_trading");
    tradingService.stopTrading();
}
