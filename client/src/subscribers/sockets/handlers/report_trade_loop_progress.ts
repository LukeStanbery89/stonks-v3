import store from "../../../store";
import { setTradeLoopProgress } from "../../../store/reducers/appReducer";

export default function report_trade_loop_progress(payload: { progress: number }) {
    console.log("report_trade_loop_progress", payload);
    store.dispatch(setTradeLoopProgress(parseInt((payload.progress * 100).toFixed(0))));
}
