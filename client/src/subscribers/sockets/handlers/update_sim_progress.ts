import store from "../../../store";
import { setSimProgress } from "../../../store/reducers/appReducer";
import Logger from "@lukestanbery/ledger";

export default function update_sim_progress(payload: { progress: number }) {
    Logger.log("update_sim_progress", payload);
    store.dispatch(setSimProgress(payload.progress));
}
