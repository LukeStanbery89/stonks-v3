import socketEmitter from "../../../lib/socketEmitter";

export default function update_sim_progress(payload: { progress: number; }) {
    console.log(`update_sim_progress: ${payload.progress}%`);
    socketEmitter.emit("update_sim_progress", payload);
}
