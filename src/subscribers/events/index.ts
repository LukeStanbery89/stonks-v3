import my_event from "./handlers/my_event";
import my_other_event from "./handlers/my_other_event";
// Import other handlers as needed

const handlers: { [key: string]: any } = {
    my_event,
    my_other_event,
    // Add other handlers here
};

export default handlers;
