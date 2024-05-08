import store from "../../../store";
import { setSimulationStatus } from "../../../store/reducers/appReducer";
import { SimulationStatus } from "../../../types/types";
import Logger from "@lukestanbery/ledger";

export default function update_sim_status(payload: { simulationStatus: SimulationStatus }) {
    Logger.log("update_sim_status", payload);
    store.dispatch(setSimulationStatus(payload.simulationStatus));
}
