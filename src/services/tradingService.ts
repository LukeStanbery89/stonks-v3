// import AlpacaProvider from "../lib/brokerage/providers/AlpacaProvider";
import config, { Config } from "../config";
import { TradeService } from "../lib/TradeService";
import BrokerageProvider from "../lib/brokerage/BrokerageProvider";
import AlpacaProvider from "../lib/brokerage/providers/AlpacaProvider";

export function getBrokerProvider(config: Config): BrokerageProvider {
    return new AlpacaProvider(config);
}

const tradeService = new TradeService(getBrokerProvider(config), config);

export default tradeService;
