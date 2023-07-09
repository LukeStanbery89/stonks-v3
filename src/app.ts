import express, { Request, Response } from "express";
import http from "http";
import path from "path";
import { Server as SocketIOServer } from "socket.io";
import { registerEventListeners } from "./events/eventListeners";
import { registerSocketEvents } from "./sockets/socketEvents";

const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);

registerEventListeners();
registerSocketEvents(new SocketIOServer(server));

app.use(express.static(path.join(__dirname, "../client/build")));

// API endpoint for fetching data
app.get("/api/data", (req: Request, res: Response) => {
    // Replace this with your actual data retrieval logic
    const data = { message: "XHR data from server" };
    res.json(data);
});

// Serve the React app
app.get("/", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
