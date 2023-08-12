import my_websocket_event from "./handlers/my_websocket_event";
import my_other_websocket_event from "./handlers/my_other_websocket_event";
import start_simulation from "./handlers/start_simulation";
import stop_simulation from "./handlers/stop_simulation";

// Import other handlers as needed...

// TODO: Figure out a metaprogramming solution to import handlers

const handlers: { [key: string]: (data: any) => void } = {
    my_websocket_event,
    my_other_websocket_event,
    start_simulation,
    stop_simulation,
    // Add other handlers here...
};

export default handlers;
