import { Server as SocketIOServer } from "socket.io";
import initRateLimiter from "./rateLimiter";
import { Express } from "express";
import { Server } from "http";
import { registerEventListeners } from "./events/eventListeners";
import { registerSocketEvents } from "./sockets/socketEvents";

type LoaderParams = {
    app: Express,
    server: Server,
}

export default function initLoaders(params: LoaderParams) {
    const {
        app,
        server,
    } = params;

    initRateLimiter(app);
    registerEventListeners();
    registerSocketEvents(new SocketIOServer(server));

    return params;
}
