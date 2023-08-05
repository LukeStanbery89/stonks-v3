import { Request, Response, Router } from "express";
import eventEmitter from "../lib/eventEmitter";
import path from "path";

const router = Router();

router.get("/api/data", (req: Request, res: Response) => {
    // Replace this with your actual data retrieval logic
    const data = { message: "XHR data from server" };
    eventEmitter.emit("my_event", { message: "Server-side event" });
    res.json(data);
});

// Serve the React app
router.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

export default router;
