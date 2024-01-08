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
            .then(resp => resp.json())
            .then(resp => resolve(convertToSecuritiesArray(resp)))
            .catch(err => reject(err));
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

export default getSecurities;
