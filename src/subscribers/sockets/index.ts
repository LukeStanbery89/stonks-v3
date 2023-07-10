import fs from "fs";
import path from "path";

const webSocketHandlersDir = path.join(__dirname, "handlers");

const webSocketHandlers: { [key: string]: any } = {};

fs.readdirSync(webSocketHandlersDir).forEach((file) => {
    const handlerName = path.basename(file, ".ts");
    const handlerPath = path.join(webSocketHandlersDir, file);
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const handler = require(handlerPath).default;
    webSocketHandlers[handlerName] = handler;
});

console.log("webSocketHandlers", webSocketHandlers);
export default webSocketHandlers;
