export interface AppState {
    simProgress: number | null;
    simInProgress: boolean;
}

export interface CounterState {
    value: number;
}

export interface RootState {
    app: AppState,
    counter: CounterState;
    // ...Add other properties for your other reducers here, if any.
  }
