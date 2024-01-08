import AlpacaProvider from "../lib/brokerage/providers/AlpacaProvider";

function getBrokerProvider() {
    return new AlpacaProvider();
}

export default getBrokerProvider;
