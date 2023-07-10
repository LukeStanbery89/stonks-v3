import fs from "fs";
import path from "path";

const listeners: { [key: string]: any } = {};

const listenersDir = path.join(__dirname, "listeners");
const files = fs.readdirSync(listenersDir);

files.forEach((file) => {
    const listenerName = path.parse(file).name;
    const listenerPath = path.join(listenersDir, file);
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const listener = require(listenerPath).default;
    listeners[listenerName] = listener;
});

export default listeners;
