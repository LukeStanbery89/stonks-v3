import eventEmitter from "../lib/eventEmitter";
import { sleep } from "../lib/utils";
import { SimulationStatus } from "../types/types";

function getTradeSimulationService() {
    let shouldContinue = false;
    const total = 5;

    async function start() {
        shouldContinue = true;
        let i = 0;
        while(shouldContinue) {
            i++;
            if (i > total) {
                eventEmitter.emit("update_sim_status", { simulationStatus: SimulationStatus.COMPLETE });
                return;
            }
            const progress = ((i / total) * 100).toFixed(0);
            eventEmitter.emit("update_sim_progress", { progress });
            await sleep(1000);
        }
    }

    function stop() {
        shouldContinue = false;
    }

    return {
        start,
        stop,
    };
}

export default getTradeSimulationService();
