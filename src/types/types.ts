// Generic Types
export type NullOrUndefined = null | undefined;
export type NullableNumber = number | null;
export type NumericString = `${number}` | number;

export enum RestMethods {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    UPDATE = "UPDATE",
    DELETE = "DELETE",
}

// Simulation Types
export enum SimulationStatus {
    NOT_STARTED = "NOT_STARTED",
    RUNNING = "RUNNING",
    STOPPED = "STOPPED",
    COMPLETE = "COMPLETE"
}

// Security Types
export type Security = {
    symbol: string,
    name: string,
}

// Order Types
export enum OrderType {
    BUY = "BUY",
    SELL = "SELL",
}

export type BaseOrder = {
    type: OrderType,
    symbol: string,
}

export type OrderByQty = BaseOrder & {
    qty: number,
    notional?: NullOrUndefined,
}

export type OrderByNotional = BaseOrder & {
    notional: number,
    qty?: NullOrUndefined,
}

export type Order = OrderByNotional | OrderByQty;

export type BuyOrder = Order & {
    type: OrderType.BUY,
}
export type SellOrder = Order & {
    type: OrderType.SELL,
}

export type OrderResult = {
    symbol: string,
    qty: NullableNumber,
    notional: NullableNumber,
}
export type BuyResult = OrderResult & {
    type: OrderType.BUY,
}
export type SellResult = OrderResult & {
    type: OrderType.SELL,
}

// Provider-Agnostic
export type ProviderBuyResult = object;
export type ProviderSellResult = object;
export type ProviderSecurity = object;

// Alpaca
export interface AlpacaSecurity extends ProviderSecurity {
    symbol: string,
    name: string,
}
export interface AlpacaOrderResult extends ProviderBuyResult {
    symbol: string,
    qty: NullableNumber,
    notional: NullableNumber,
}
export interface AlpacaBuyResult extends AlpacaOrderResult {
    type: OrderType.BUY,
}
export interface AlpacaSellResult extends AlpacaOrderResult {
    type: OrderType.SELL,
}

export type AlpacaExchange = "CRYPTO";
export type AlpacaAssetClass = "crypto";
export type AlpacaSide = "long" |  "short";

// Market data types
export type ProviderPriceData = object;
export interface AlpacaPriceData extends ProviderPriceData {
    "c": number,
    "h": number,
    "l": number,
    "n": number,
    "o": number,
    "t": string,
    "v": number,
    "vw": number,
}

export type HistoricalPriceDataRequestParams = {
    symbol: string;
    start: string;
    end: string;
    limit?: number;
};

export type PriceData = {
    timestamp: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
};

// Positions
export type ProviderPosition = object;
export interface AlpacaPosition extends ProviderPosition {
    asset_id: string;
    symbol: string;
    exchange: AlpacaExchange;
    asset_class: AlpacaAssetClass;
    asset_marginable: boolean;
    qty: NumericString;
    avg_entry_price: NumericString;
    side: AlpacaSide;
    market_value: NumericString;
    cost_basis: NumericString;
    unrealized_pl: NumericString;
    unrealized_plpc: NumericString;
    unrealized_intraday_pl: NumericString;
    unrealized_intraday_plpc: NumericString;
    current_price: NumericString;
    lastday_price: NumericString;
    change_today: NumericString;
    qty_available: NumericString;
}

export type Position = {
    symbol: string;
    qty: number;
}

export type PositionsMap = {
    [symbol: string]: Position;
}

export enum Decision {
    BUY = "BUY",
    SELL = "SELL",
    HOLD = "HOLD"
}

export type SecurityStats = {
    currentPrice: number;
    sampleMean: number;
    sumOfSquares: number;
    sampleVariance: number;
    stdDev: number;
    upperBand: number;
    lowerBand: number;
    slope: number;
    isOwned: boolean;
    decision: Decision;
    decisionReason: string;
    bars?: PriceData[];
    [symbol: string]: any; // Add index signature
};

export type SecurityStatsMap = {
    [symbol: string]: SecurityStatsMap;
};

// Trade types

export enum TradeLoopStatus {
    RUNNING = "RUNNING",
    STOPPED = "STOPPED",
}
