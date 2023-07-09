import express, { Request, Response } from "express";
import http from "http";
import path from "path";
import { Server, Socket } from "socket.io";

const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = new Server(server);

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

io.on("connection", (socket: Socket) => {
    console.log("New socket connection");

    // Handle custom events from the client
    socket.on("myEvent", (data: any) => {
        console.log("Received data:", data);

        // Process the data and emit updates or perform any other actions
        // You can define your own logic here based on your application's requirements

        // Emit updates to the client
        io.emit("update", { message: "Websocket data from server" });
    });

    // Handle socket disconnection
    socket.on("disconnect", () => {
        console.log("Socket connection closed");
    });
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
