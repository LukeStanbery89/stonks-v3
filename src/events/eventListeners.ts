import eventEmitter from "./eventEmitter";

// Define your event listeners
const myEventListener = (payload: any) => {
    console.log("Received event:", payload);
    // Process the event payload
};

// Register event listeners
export function registerEventListeners() {
    eventEmitter.on("myEvent", myEventListener);
}
