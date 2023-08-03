module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",
    },
    testRegex: "/tests/.*\\.(jsx?|tsx?)$",
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
    },
    collectCoverage: true,
    collectCoverageFrom: ["src/**/*.{ts,tsx,js,jsx}", "!src/**/*.d.ts"],
    coverageReporters: ["text", "html"],
    testPathIgnorePatterns: ["/client/"],
};
