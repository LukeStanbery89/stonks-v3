import { combineReducers } from "redux";
import counterReducer from "./counterReducer"; // Import your counterReducer here
import appReducer from "./appReducer";

const rootReducer = combineReducers({
    counter: counterReducer,
    app: appReducer,
    // ...Add more reducers here if you have them
});

export default rootReducer;
