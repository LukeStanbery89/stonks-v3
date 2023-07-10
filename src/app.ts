import express from "express";
import http from "http";
import path from "path";
import initLoaders from "./loaders";
import routes from "./api/routes";

const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);

initLoaders(server);

app.use(express.static(path.join(__dirname, "../client/build")));

// Routes
app.use(routes);

// Serve the React app
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
