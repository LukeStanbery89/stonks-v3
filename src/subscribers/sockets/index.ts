import my_websocket_event from "./handlers/my_websocket_event";
import my_other_websocket_event from "./handlers/my_other_websocket_event";
import start_trading from "./handlers/start_trading";
import stop_trading from "./handlers/stop_trading";
// Import other handlers as needed

const handlers: { [key: string]: any } = {
    my_websocket_event,
    my_other_websocket_event,
    start_trading,
    stop_trading,
    // Add other handlers here
};

export default handlers;
