/* eslint-disable @typescript-eslint/no-var-requires */
const concurrently = require("concurrently");

(async () => {
    const { default: chalk } = await import("chalk");

    try {
        await concurrently([
            {
                name: "server",
                command: "npm run dev:server",
                prefixColor: chalk.blue.toString(),
            },
            {
                name: "client",
                command: "npm run dev:client",
                prefixColor: chalk.green.toString(),
            },
        ]);
    } catch (err) {
        console.error(err);
    }
})();
