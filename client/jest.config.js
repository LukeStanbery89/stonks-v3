module.exports = {
    testEnvironment: "jest-environment-jsdom",
    setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
    transform: {
        "^.+\\.tsx?$": "babel-jest",
    },
};
