import fs from "fs";
import path from "path";

const eventHandlers: { [key: string]: any } = {};

const eventHandlersDir = path.join(__dirname, "handlers");
const files = fs.readdirSync(eventHandlersDir);

files.forEach((file) => {
    const handlerName = path.parse(file).name;
    const HandlerPath = path.join(eventHandlersDir, file);
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const handler = require(HandlerPath).default;
    eventHandlers[handlerName] = handler;
});

export default eventHandlers;
