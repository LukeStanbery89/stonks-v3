import socketEmitter from "../../../lib/socketEmitter";

export default function update_progress(payload: { progress: number; }) {
    console.log(`update_progress: ${payload.progress}%`);
    socketEmitter.emit("update_progress", payload);
}
