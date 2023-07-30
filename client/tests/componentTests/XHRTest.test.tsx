/* eslint-disable @typescript-eslint/no-empty-function */
import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import XHRTest from "../../src/components/test/XHRTest";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

describe("XHRTest component", () => {
    beforeEach(() => {
        // Reset fetchMock before each test
        fetchMock.resetMocks();

        // Replace console.log and console.error with mock functions
        jest.spyOn(console, "log").mockImplementation(() => {});
        jest.spyOn(console, "error").mockImplementation(() => {});
    });

    afterEach(() => {
        // Restore original console.log and console.error after each test
        jest.restoreAllMocks();
    });

    it("should display the initial message", () => {
        const { getByText } = render(<XHRTest />);
        expect(getByText("XHR Result:")).toBeInTheDocument();
    });

    it("should display the loading message when the XHR button is clicked", () => {
        // Mock the successful response from the XHR request
        fetchMock.mockResponseOnce(JSON.stringify({ message: "Sending XHR..." }));

        const { getByText } = render(<XHRTest />);
        const button = getByText("Test XHR");
        fireEvent.click(button);
        expect(getByText("XHR Result: Sending XHR...")).toBeInTheDocument();
    });

    it("should display the XHR response message after successful XHR request", async () => {
        const responseData = { message: "Test success!" };
        // Mock the successful response from the XHR request
        fetchMock.mockResponseOnce(JSON.stringify(responseData));

        const { getByText } = render(<XHRTest />);
        const button = getByText("Test XHR");
        fireEvent.click(button);

        await waitFor(() => expect(getByText("XHR Result: Test success!")).toBeInTheDocument());
    });

    it("should display the error message after failed XHR request", async () => {
        // Mock the failed response from the XHR request
        fetchMock.mockReject(new Error("Test error"));

        const { getByText } = render(<XHRTest />);
        const button = getByText("Test XHR");
        fireEvent.click(button);

        await waitFor(() => expect(getByText("XHR Result: Error during XHR")).toBeInTheDocument());
    });
});
