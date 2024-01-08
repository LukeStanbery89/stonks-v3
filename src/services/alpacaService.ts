import config from "../config";
import { AlpacaSecurity, Security } from "../types/types";

function getSecurities(): Promise<Security[]> {
    return new Promise((resolve, reject) => {
        fetch("https://paper-api.alpaca.markets/v2/assets?status=active&asset_class=crypto", {
            method: "GET",
            headers: {
                accept: "application/json",
                "APCA-API-KEY-ID": config.APCA_API_KEY_ID,
                "APCA-API-SECRET-KEY": config.APCA_API_SECRET_KEY,
            },
        })
            .then((resp: Response) => resp.json())
            .then(resp => resolve(convertToSecuritiesArray(resp)))
            .catch((err: Error) => reject(err));
    });
}

// TODO replace return type
function buySecurity(): object {
    return new Promise((resolve, reject) => {
        const options = {
            method: "POST",
            headers: {
                accept: "application/json",
                "content-type": "application/json",
                "APCA-API-KEY-ID": "PKSELCPRA4U89ZZ09K25",
                "APCA-API-SECRET-KEY": "tlwjgvhbhx7qarkQ2egfB4G53EwkmNwvz3y2nVU9",
            },
            body: JSON.stringify({
                side: "buy",
                type: "market",
                time_in_force: "gtc",
                symbol: "ETH/USD",
                qty: "1",
            }),
        };

        fetch("https://paper-api.alpaca.markets/v2/orders", options)
            .then((resp: Response) => resp.json())
            .then(resp => resolve(resp))
            .catch((err: Error) => reject(err));
    });
}

function convertToSecuritiesArray(results: any): Security[] {
    return results.map((security: AlpacaSecurity) => convertToSecurity(security));
}

function convertToSecurity(result: AlpacaSecurity): Security {
    return {
        symbol: result.symbol,
        name: result.name,
    };
}

export {
    buySecurity,
    getSecurities,
};
