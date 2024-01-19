import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState, SimulationStatus } from "../../types/types";

const initialState: AppState = {
    simProgress: 0,
    simulationStatus: SimulationStatus.NOT_STARTED,
    tradeLoopProgress: 0,
};

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setSimProgress: (state, action: PayloadAction<number>) => {
            state.simProgress = action.payload;
        },
        setSimulationStatus: (state, action: PayloadAction<SimulationStatus>) => {
            state.simulationStatus = action.payload;
        },
        setTradeLoopProgress: (state, action: PayloadAction<number>) => {
            state.tradeLoopProgress = action.payload;
        },
    },
});

export const { setSimProgress, setSimulationStatus, setTradeLoopProgress } = appSlice.actions;
export default appSlice.reducer;
