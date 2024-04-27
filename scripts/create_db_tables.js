const dotenv = require("dotenv");
const mysql = require("mysql2");

dotenv.config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

const createTableCommands = [
    `CREATE TABLE securities (
        id bigint unsigned NOT NULL AUTO_INCREMENT,
        symbol varchar(20) NOT NULL,
        name varchar(255) NOT NULL,
        security_type enum('CRYPTO','STOCK') NOT NULL,
        created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`,

    `CREATE TABLE bars (
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

connection.connect(async (err) => {
    if (err) {
        console.error("Error connecting to database: ", err);
        return;
    }

    console.log("Connected to database!");

    createTableCommands.forEach((command) => {
        connection.query(command, (err, results, fields) => {
            if (err) {
                console.error("Error creating table: ", err);
                return;
            }
            console.log("Table created: ", results);
        });
    });

    connection.end();
});
