import express from "express";
import http from "http";
import path from "path";
import initLoaders from "./loaders";
import routes from "./routes";
import config from "./config";

const app = express();
const server = http.createServer(app);

// Event listeners, WebSockets, etc.
initLoaders({ app, server });

// Serve client/build directory
app.use(express.static(path.join(__dirname, "../client/build")));

// Routes
app.use(routes);

// Start the app
server.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`);
});
