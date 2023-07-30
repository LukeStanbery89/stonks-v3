module.exports = {
    testEnvironment: "jest-environment-jsdom",
    setupFilesAfterEnv: [
        "@testing-library/jest-dom/extend-expect",
        "<rootDir>/tests/setupTests.js", // Correct the path here if needed
    ],
    transform: {
        "^.+\\.tsx?$": "babel-jest",
    },
    roots: ["<rootDir>/tests"],
    collectCoverage: true,
    collectCoverageFrom: ["src/**/*.{ts,tsx,js,jsx}", "!src/**/*.d.ts"],
    coverageReporters: ["text", "html"],
};
