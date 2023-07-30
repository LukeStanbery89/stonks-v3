// rootReducer.ts
import { combineReducers } from "redux";
import counterReducer from "./counterReducer"; // Import your counterReducer here

const rootReducer = combineReducers({
    counter: counterReducer, // Add more reducers here if you have them
});

export default rootReducer;
