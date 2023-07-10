import fs from "fs";
import path from "path";

const handlers: { [key: string]: any } = {};

const handlersDir = path.join(__dirname, "handlers");
const files = fs.readdirSync(handlersDir);

files.forEach((file) => {
    const handlerName = path.parse(file).name;
    const HandlerPath = path.join(handlersDir, file);
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const handler = require(HandlerPath).default;
    handlers[handlerName] = handler;
});

export default handlers;
