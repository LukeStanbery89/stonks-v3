module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",
    },
    testRegex: "/tests/.*\\.test.(jsx?|tsx?)$",
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
    },
    collectCoverage: true,
    collectCoverageFrom: ["src/**/*.{ts,tsx,js,jsx}", "!src/**/*.d.ts"],
    coveragePathIgnorePatterns: [
        "/node_modules/",
        "/tests/",
    ],
    coverageReporters: ["text", "html", "lcov"],
    testPathIgnorePatterns: ["/client/"],
    // verbose: true,
};
