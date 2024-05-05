import Database from "../../lib/Database";

// Mocked mysql connection
jest.mock("mysql2", () => ({
    createConnection: jest.fn(() => ({
        connect: jest.fn((callback: (err: any) => void) => callback(null)),
        query: jest.fn(),
        end: jest.fn(),
    })),
}));

describe("Database", () => {
    let database: Database;

    beforeAll(() => {
        database = Database.getInstance();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should create a singleton instance of Database", () => {
        const instance1 = Database.getInstance();
        const instance2 = Database.getInstance();

        expect(instance1).toBe(instance2);
    });

    it("should throw an error when there is an error connecting to the database", async () => {
        // Mock the connect method to throw an error
        (database as any).connection.connect.mockImplementationOnce((callback: (err: any) => void) => {
            callback(new Error("Connection error"));
        });

        await expect(database.queryRaw("SELECT * FROM users")).rejects.toEqual("Error connecting to database: Error: Connection error");
    });

    it("should execute a raw query", async () => {
        const sql = "SELECT * FROM users";
        const expectedResult = [{ id: 1, name: "John" }];

        // Mock the query method
        (database as any).connection.query.mockImplementationOnce((query: string, callback: (error: any, results: any) => void) => {
            callback(null, expectedResult);
        });

        const result = await database.queryRaw(sql);

        expect(result).toEqual(expectedResult);
        expect((database as any).connection.query).toHaveBeenCalledWith(sql, expect.any(Function));
    });

    it("should execute multiple raw queries", async () => {
        const queries = ["SELECT * FROM users", "SELECT * FROM products"];
        const expectedResults = [[{ id: 1, name: "John" }], [{ id: 1, name: "Product 1" }]];

        // Mock the query method
        (database as any).connection.query.mockImplementation((query: string, callback: (error: any, results: any) => void) => {
            if (query === queries[0]) {
                callback(null, expectedResults[0]);
            } else if (query === queries[1]) {
                callback(null, expectedResults[1]);
            }
        });

        const results = await database.queriesRaw(queries);

        expect(results).toEqual(expectedResults);
        expect((database as any).connection.query).toHaveBeenCalledTimes(2);
        expect((database as any).connection.query).toHaveBeenNthCalledWith(1, queries[0], expect.any(Function));
        expect((database as any).connection.query).toHaveBeenNthCalledWith(2, queries[1], expect.any(Function));
    });

    it("should throw an error when there is an error querying the database", async () => {
        const sql = "SELECT * FROM users";

        // Mock the query method to throw an error
        (database as any).connection.query.mockImplementationOnce((query: string, callback: (error: any, results: any) => void) => {
            callback(new Error("Query error"), null);
        });

        await expect(database.queryRaw(sql)).rejects.toEqual("Error querying database: Error: Query error");
    });
});
