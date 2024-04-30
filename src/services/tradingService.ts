import config from "../config";
import { Config } from "../types/types";
import { TradeManager } from "../lib/TradeManager";
import BrokerageProvider from "../lib/brokerage/BrokerageProvider";
import AlpacaProvider from "../lib/brokerage/providers/AlpacaProvider";

export function getBrokerProvider(config: Config): BrokerageProvider {
    return new AlpacaProvider(config);
}

const tradeService = new TradeManager(getBrokerProvider(config), config);

export default tradeService;
