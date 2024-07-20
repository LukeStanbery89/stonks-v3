import mysql, { QueryResult } from "mysql2";
import Logger from "@lukestanbery/ledger";
import { sleep } from "./utils";
import { PoolConnection } from "mysql2/promise";

export default class Database {
    private static instance: Database;
    private connectionPool: mysql.Pool;

    private constructor() {
        Logger.info("Creating new database connection pool");
        this.connectionPool = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            waitForConnections: true,
            connectionLimit: 10,
            maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
            idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
            queueLimit: 0,
            enableKeepAlive: true,
            keepAliveInitialDelay: 0,
        });
    }

    public static getInstance(): Database {
        if (!Database.instance) {
            Logger.info("Creating new database instance");
            Database.instance = new Database();
        }
        return Database.instance;
    }

    public async queryRaw(sql: string): Promise<object[]> {
        const queryResult = await this.queriesRaw([sql]);
        return queryResult[0];
    }

    public async queriesRaw(queries: string[]): Promise<any[][]> {
        const queryResults: object[][] = [];

        for (const query of queries) {
            // Logger.debug("executing query: ", query);
            let connection: PoolConnection;
            try {
                connection = await this.connectionPool.promise().getConnection();
                const [rows] = await connection.query(query);
                // Logger.debug("query results: ", rows);
                queryResults.push(rows as object[]);
            } catch (err) {
                throw new Error("Error querying database: " + err);
            }
            if (connection) {
                connection.release();
            }
            await sleep(1000);
        }

        return queryResults;
    }
}
