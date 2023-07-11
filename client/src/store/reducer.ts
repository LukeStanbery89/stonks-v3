// reducer.ts
import { createSlice } from "@reduxjs/toolkit";
import { TestAppState } from "../types/types";

const initialState: TestAppState = {
    value: 0,
};

const appSlice = createSlice({
    name: "test",
    initialState,
    reducers: {
        incrementValue: (state) => {
            state.value += 1;
        },
        decrementValue: (state) => {
            state.value -= 1;
        },
    },
});

export const { incrementValue, decrementValue } = appSlice.actions;
export default appSlice.reducer;
