module.exports = {
    testEnvironment: "jest-environment-jsdom",
    setupFilesAfterEnv: [
        "@testing-library/jest-dom/extend-expect",
        "./src/setupTests.js",
    ],
    transform: {
        "^.+\\.tsx?$": "babel-jest",
    },
};
