import socketEmitter from "../../../lib/socketEmitter";

export default function my_other_websocket_event(data: any) {
    console.log("Other WebSocket data from client:", data);

    // Process the data and emit updates or perform any other actions
    // You can define your own logic here based on your application's requirements

    // Emit updates to the client using the socketEmitter instance
    socketEmitter.emit("update", { message: "Other Websocket data from server" });
}
