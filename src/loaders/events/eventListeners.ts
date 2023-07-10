import eventEmitter from "./eventEmitter";
import eventListeners from "../../subscribers/events/index";

export function registerEventListeners() {
    console.log("Registering event handlers...");
    for (const [event, handler] of Object.entries(eventListeners)) {
        eventEmitter.on(event, handler);
    }
}
