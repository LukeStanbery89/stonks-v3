import store from "../../../store";
import { setSimProgress } from "../../../store/reducers/appReducer";

export default function update_sim_progress(payload: { progress: number }) {
    console.log("update_sim_progress", payload);
    store.dispatch(setSimProgress(payload.progress));
}
