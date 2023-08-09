import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "../types";

const initialState: AppState = {
    simProgress: 0,
    simInProgress: false,
};

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setSimProgress: (state, action: PayloadAction<number>) => {
            state.simProgress = action.payload;
        },
        setSimInProgress: (state, action: PayloadAction<boolean>) => {
            state.simInProgress = action.payload;
        },
    },
});

export const { setSimProgress } = appSlice.actions;
export default appSlice.reducer;
