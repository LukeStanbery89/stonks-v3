import my_websocket_event from "./handlers/my_websocket_event";
import my_other_websocket_event from "./handlers/my_other_websocket_event";
// Import other handlers as needed

const handlers: { [key: string]: any } = {
    my_websocket_event,
    my_other_websocket_event,
    // Add other handlers here
};

export default handlers;
