import Logger from "../../lib/Logger";
import eventEmitter from "../../lib/eventEmitter";
import eventListeners from "../../subscribers/events/handlers";

export function registerEventListeners() {
    Logger.log("Registering event handlers...");
    for (const [event, handler] of Object.entries(eventListeners)) {
        eventEmitter.on(event, handler);
    }
}
