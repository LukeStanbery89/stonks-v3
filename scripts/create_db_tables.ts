import dotenv from "dotenv";
import Database from "../src/lib/Database";

dotenv.config();

const createTableCommands = [
    `CREATE TABLE IF NOT EXISTS securities (
        id bigint unsigned NOT NULL AUTO_INCREMENT,
        symbol varchar(20) NOT NULL,
        name varchar(255) NOT NULL,
        security_type enum('CRYPTO','STOCK') NOT NULL,
        created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`,

    `CREATE TABLE IF NOT EXISTS bars (
        id bigint unsigned NOT NULL AUTO_INCREMENT,
        security_id bigint unsigned NOT NULL,
        timestamp timestamp NOT NULL,
        open decimal(15,2) NOT NULL,
        high decimal(15,2) NOT NULL,
        low decimal(15,2) NOT NULL,
        close decimal(15,2) NOT NULL,
        volume bigint unsigned NOT NULL,
        created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        UNIQUE KEY id (id),
        KEY security_id (security_id),
        CONSTRAINT bars_ibfk_1 FOREIGN KEY (security_id) REFERENCES securities (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`,
];

(async () => {
    const db = Database.getInstance();
    await db.queriesRaw(createTableCommands);
})();
