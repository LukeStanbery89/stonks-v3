export interface AppState {
    simProgress: number | null;
    simulationStatus: SimulationStatus;
    tradeLoopProgress: number | null;
}

export interface CounterState {
    value: number;
}

export interface RootState {
    app: AppState,
    counter: CounterState;
}

export enum BS_BACKGROUND {
    BG_PRIMARY = "bg-primary",
    BG_PRIMARY_SUBTLE = "bg-primary-subtle",
    BG_SECONDARY = "bg-secondary",
    BG_SECONDARY_SUBTLE = "bg-secondary-subtle",
    BG_SUCCESS = "bg-success",
    BG_SUCCESS_SUBTLE = "bg-success-subtle",
    BG_DANGER = "bg-danger",
    BG_DANGER_SUBTLE = "bg-danger-subtle",
    BG_WARNING = "bg-warning",
    BG_WARNING_SUBTLE = "bg-warning-subtle",
    BG_INFO = "bg-info",
    BG_INFO_SUBTLE = "bg-info-subtle",
    BG_LIGHT = "bg-light",
    BG_LIGHT_SUBTLE = "bg-light-subtle",
    BG_DARK = "bg-dark",
    BG_DARK_SUBTLE = "bg-dark-subtle",
    BG_BODY_SECONDARY = "bg-body-secondary",
    BG_BODY_TERTIARY = "bg-body-tertiary",
    BG_BODY = "bg-body",
    BG_BLACK = "bg-black",
    BG_WHITE = "bg-white",
    BG_TRANSPARENT = "bg-transparent",
}


export enum SimulationStatus {
    NOT_STARTED,
    RUNNING,
    STOPPED,
    COMPLETE
}
