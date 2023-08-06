import { Request, Response, Router } from "express";
import eventEmitter from "../lib/eventEmitter";

const apiRouter = Router();

apiRouter.get("/xhrTest", (req: Request, res: Response) => {
    // Replace this with your actual data retrieval logic
    const data = { message: "XHR data from server" };
    eventEmitter.emit("my_event", { message: "Server-side event" });
    res.json(data);
});

export default apiRouter;
