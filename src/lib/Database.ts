import mysql from "mysql2";
import Logger from "@lukestanbery/ledger";

export default class Database {
    private static instance: Database;
    private connection: mysql.Connection;

    private constructor() {
        this.connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });
    }

    public static getInstance(): Database {
        if (!Database.instance) {
            Logger.log("Creating new database instance");
            Database.instance = new Database();
        }
        return Database.instance;
    }

    public async queryRaw(sql: string): Promise<object[]> {
        const queryResult = await this.queriesRaw([sql]);
        return queryResult[0];
    }

    public async queriesRaw(queries: string[]): Promise<object[][]> {
        return new Promise((resolve, reject) => {
            this.connection.connect(async (err) => {
                if (err) {
                    reject("Error connecting to database: " + err);
                }

                Logger.log("Connected to database!");

                const queryResults: object[][] = [];

                for (const query of queries) {
                    this.connection.query(query, (err, results, _fields) => {
                        if (err) {
                            reject("Error querying database: " + err);
                        }
                        queryResults.push(results as object[]);
                    });
                }

                this.connection.end();

                resolve(queryResults);
            });
        });
    }
}

