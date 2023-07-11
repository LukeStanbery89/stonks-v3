import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./reducer";

const store = configureStore({
    reducer: {
        test: appReducer,
    },
});

export default store;
