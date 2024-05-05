import socketEmitter from "../../../lib/socketEmitter";
import constants from "../../../config/constants.json";
import Logger from "../../../lib/Logger";

export default function my_websocket_event(data: any) {
    Logger.log("WebSocket data from client:", data);

    // Process the data and emit updates or perform any other actions
    // You can define your own logic here based on your application's requirements

    // Emit updates to the client using the socketEmitter instance
    socketEmitter.emit(constants.SOCKET_EVENTS.UPDATE, { message: "Websocket data from server" });
}
