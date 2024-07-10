import Database from "../../lib/Database";

// Mocked mysql connection
jest.mock("mysql2", () => ({
    createConnection: jest.fn(() => ({
        connect: jest.fn((callback: (err: any) => void) => callback(null)),
        query: jest.fn(),
        end: jest.fn(),
        promise: jest.fn(() => ({
            query: jest.fn(),
        })),
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
        const mockQueryMethod = jest.fn(() => [expectedResult]);
        (database as any).connection.promise.mockImplementationOnce(() => {
            return {
                query: mockQueryMethod,
            };
        });

        const result = await database.queryRaw(sql);

        expect(result).toEqual(expectedResult);
        expect(mockQueryMethod).toHaveBeenCalledWith(sql);
    });

    it("should execute multiple raw queries", async () => {
        const queries = ["SELECT * FROM users", "SELECT * FROM products"];
        const expectedResults = [[{ id: 1, name: "John" }], [{ id: 1, name: "Product 1" }]];

        // Mock the query method
        const mockQueryMethod = jest.fn((query: string) => {
            if (query === queries[0]) {
                return [expectedResults[0]];
            } else if (query === queries[1]) {
                return [expectedResults[1]];
            }
        });
        (database as any).connection.promise.mockImplementation(() => {
            return {
                query: mockQueryMethod,
            };
        });

        const results = await database.queriesRaw(queries);

        expect(results).toEqual(expectedResults);
        expect(mockQueryMethod).toHaveBeenCalledTimes(2);
        expect(mockQueryMethod).toHaveBeenNthCalledWith(1, queries[0]);
        expect(mockQueryMethod).toHaveBeenNthCalledWith(2, queries[1]);
    });

    it("should throw an error when there is an error querying the database", async () => {
        const sql = "SELECT * FROM users";

        // Mock the query method to throw an error
        (database as any).connection.promise.mockImplementationOnce(() => {
            return {
                query: jest.fn(() => {
                    throw new Error("Query error");
                }),
            };
        });

        await expect(database.queryRaw(sql)).rejects.toEqual("Error querying database: Error: Query error");
    });
});
