import dotenv from "dotenv";
import Database from "../src/lib/Database";
import tradingService from "../src/services/tradingService";
import Logger from "@lukestanbery/ledger";

dotenv.config();

(async () => {
    // Get the list of securities from the API
    const securities = await tradingService.getBrokerageProvider().securities();

    // Create the list of commands to populate the securities table
    const securitiesTableCommands = securities.map((security) =>
        `INSERT INTO securities (symbol, name, security_type)
        VALUES ('${security.symbol}', '${security.name}', 'CRYPTO');`);

    Logger.log("securitiesTableCommands: ", securitiesTableCommands);

    // Populate the securities table with the list of securities
    const db = Database.getInstance();
    await db.queriesRaw(securitiesTableCommands);
})();
