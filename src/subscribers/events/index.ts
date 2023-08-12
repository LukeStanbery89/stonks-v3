import my_event from "./handlers/my_event";
import my_other_event from "./handlers/my_other_event";
import update_sim_progress from "./handlers/update_sim_progress";
import update_sim_status from "./handlers/update_sim_status";

// Import additional handlers as needed...

// TODO: Figure out a metaprogramming solution to import handlers

const handlers: { [key: string]: (data: any) => void } = {
    my_event,
    my_other_event,
    update_sim_progress,
    update_sim_status,
    // Add additional handlers here...
};

export default handlers;
