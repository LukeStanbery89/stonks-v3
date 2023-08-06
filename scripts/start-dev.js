const concurrently = require("concurrently");

(async () => {
    try {
        await concurrently([
            {
                name: "server",
                command: "npm run dev:server",
                prefixColor: "magenta",
            },
            {
                name: "client",
                command: "npm run dev:client",
                prefixColor: "cyan",
            },
        ], {
            prefix: "{time} [{name}]",
            timestampFormat: "yyyy-MM-dd HH:mm:ss",
        });
    } catch (err) {
        console.error(err);
    }
})();
