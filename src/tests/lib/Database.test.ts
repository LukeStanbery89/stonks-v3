import { get } from "http";
import Database from "../../lib/Database";

// Mocked mysql connection
jest.mock("mysql2", () => ({
    createPool: jest.fn(() => ({
        promise: jest.fn(() => ({
            query: jest.fn(),
            getConnection: jest.fn(() => ({
                query: jest.fn(),
                release: jest.fn(),
            })),
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
        const mockError = new Error("Connection error");
        (database as any).connectionPool.promise.mockImplementationOnce(() => ({
            getConnection: jest.fn(() => {
                throw mockError;
            }),
        }));

        await expect(database.queryRaw("SELECT * FROM users")).rejects.toEqual(new Error("Error querying database: " + mockError));
    });

    it("should execute a raw query", async () => {
        const sql = "SELECT * FROM users";
        const expectedResult = [{ id: 1, name: "John" }];

        // Mock the query method
        const mockQueryMethod = jest.fn(() => [expectedResult]);
        (database as any).connectionPool.promise.mockImplementationOnce(() => ({
            getConnection: jest.fn(() => ({
                query: mockQueryMethod,
                release: jest.fn(),
            })),
        }));

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
        (database as any).connectionPool.promise.mockImplementation(() => ({
            getConnection: jest.fn(() => ({
                query: mockQueryMethod,
                release: jest.fn(),
            })),
        }));

        const results = await database.queriesRaw(queries);

        expect(results).toEqual(expectedResults);
        expect(mockQueryMethod).toHaveBeenCalledTimes(2);
        expect(mockQueryMethod).toHaveBeenNthCalledWith(1, queries[0]);
        expect(mockQueryMethod).toHaveBeenNthCalledWith(2, queries[1]);
    });

    it("should throw an error when there is an error querying the database", async () => {
        const sql = "SELECT * FROM users";
        const mockError = new Error("Query error");

        // Mock the query method to throw an error
        (database as any).connectionPool.promise.mockImplementationOnce(() => ({
            getConnection: jest.fn(() => ({
                query: jest.fn(() => {
                    throw mockError;
                }),
                release: jest.fn(),
            })),
        }));

        await expect(database.queryRaw(sql)).rejects.toEqual(new Error("Error querying database: " + mockError));
    });
});
