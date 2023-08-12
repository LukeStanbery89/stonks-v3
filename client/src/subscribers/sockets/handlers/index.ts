import update_sim_progress from "./update_sim_progress";
import update_sim_status from "./update_sim_status";

// Import other handlers here...
// TODO: Figure out a metaprogramming solution to import handlers

const handlers: { [key: string]: (data: any) => void } = {
    update_sim_progress,
    update_sim_status,
    // Additional handlers go here...
};

export default handlers;
