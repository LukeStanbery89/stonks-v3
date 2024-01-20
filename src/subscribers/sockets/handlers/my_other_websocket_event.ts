import socketEmitter from "../../../lib/socketEmitter";
import constants from "../../../config/constants.json";

export default function my_other_websocket_event(data: any) {
    console.log("Other WebSocket data from client:", data);
    socketEmitter.emit(constants.SOCKET_EVENTS.UPDATE, { message: "Other Websocket data from server" });
}
