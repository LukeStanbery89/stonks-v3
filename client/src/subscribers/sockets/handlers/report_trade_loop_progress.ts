import store from "../../../store";
import { setTradeLoopProgress } from "../../../store/reducers/appReducer";
import constants from "../../../config/constants.json";
import Logger from "@lukestanbery/ledger";

export default function report_trade_loop_progress(payload: { progress: number }) {
    Logger.log(constants.EVENTS.REPORT_TRADE_LOOP_PROGRESS, payload);
    store.dispatch(setTradeLoopProgress(parseInt((payload.progress * 100).toFixed(0))));
}
