import { Router } from "express";
import path from "path";
import apiRouter from "./apiRouter";

const router = Router();

// Serve the React app
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

router.use("/api", apiRouter);

// Additional routers go here...

export default router;
