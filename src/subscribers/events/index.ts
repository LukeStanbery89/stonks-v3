import my_event from "./handlers/my_event";
import my_other_event from "./handlers/my_other_event";
import update_progress from "./handlers/update_progress";
// Import other handlers as needed

const handlers: { [key: string]: any } = {
    my_event,
    my_other_event,
    update_progress,
    // Add other handlers here
};

export default handlers;
