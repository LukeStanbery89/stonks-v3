import { Server as SocketIOServer } from "socket.io";
import { registerEventListeners } from "./events/eventListeners";
import { registerSocketEvents } from "./sockets/socketEvents";
import http from "http";

export default function initLoaders(server: http.Server) {
    registerEventListeners();
    registerSocketEvents(new SocketIOServer(server));
}
