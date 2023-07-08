import express, { Request, Response } from "express";
import path from "path";

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "../client/build")));

// API endpoint for fetching data
app.get("/api/data", (req: Request, res: Response) => {
    // Replace this with your actual data retrieval logic
    const data = { message: "Data from server" };
    res.json(data);
});

// Serve the React app
app.get("/", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
