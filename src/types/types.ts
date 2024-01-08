export enum RestMethods {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    UPDATE = "UPDATE",
    DELETE = "DELETE",
}

export enum SimulationStatus {
    NOT_STARTED,
    RUNNING,
    STOPPED,
    COMPLETE
}

export type Security = {
    symbol: string,
    name: string,
}

export type BuyResult = {
    symbol: string,
}

// Provider-Agnostic
export type ProviderBuyResult = object;
export type ProviderSecurity = object;

// Alpaca
export interface AlpacaSecurity extends ProviderSecurity {
    symbol: string,
    name: string,
}

export interface AlpacaBuyResult extends ProviderBuyResult {
    symbol: string,
}
