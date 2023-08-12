import socketEmitter from "../../../lib/socketEmitter";

export default function my_other_websocket_event(data: any) {
    console.log("Other WebSocket data from client:", data);
    socketEmitter.emit("update", { message: "Other Websocket data from server" });
}
