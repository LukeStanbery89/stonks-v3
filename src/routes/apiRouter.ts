import { Request, Response, Router } from "express";
import eventEmitter from "../lib/eventEmitter";
import constants from "../config/constants.json";

const apiRouter = Router();

apiRouter.get("/xhrTest", (req: Request, res: Response) => {
    // Replace this with your actual data retrieval logic
    const data = { message: "XHR data from server" };
    eventEmitter.emit(constants.EVENTS.MY_EVENT, { message: "Server-side event" });
    res.json(data);
});

export default apiRouter;
