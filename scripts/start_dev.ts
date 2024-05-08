import concurrently from "concurrently";
import Logger from "@lukestanbery/ledger";

(async () => {
    try {
        await concurrently([
            {
                name: "server",
                command: "npm run dev:server:watch",
                prefixColor: "magenta",
            },
            {
                name: "server",
                command: "npm run dev:server:serve",
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
        Logger.error(err);
    }
})();
