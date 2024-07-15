/* eslint-disable no-console */
// Avoid printing logs during tests
console.log = jest.fn();
console.error = jest.fn();
console.warn = jest.fn();
console.info = jest.fn();

// We want to avoid pausing the tests, so we need to mock the sleep function
jest.mock("../lib/utils", () => ({
    sleep: jest.fn(),
}));
