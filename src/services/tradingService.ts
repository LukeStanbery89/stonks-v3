import eventEmitter from "../lib/eventEmitter";
import { sleep } from "../lib/utils";

function getTradingService() {
    let shouldContinue = false;
    const total = 30;

    async function startTrading() {
        shouldContinue = true;
        let i = 0;
        while(shouldContinue) {
            i++;
            if (i > total) return;
            const progress = ((i / total) * 100).toFixed(0);
            eventEmitter.emit("update_progress", { progress });
            await sleep(1000);
        }
    }

    function stopTrading() {
        shouldContinue = false;
    }

    return {
        startTrading,
        stopTrading,
    };
}

export default getTradingService();
