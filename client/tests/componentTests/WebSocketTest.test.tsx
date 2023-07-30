import React from "react";
import { render, fireEvent } from "@testing-library/react";
import WebSocketTest from "../../src/components/test/WebSocketTest";

describe("WebSocketTest component", () => {
    it("should display the loading message when the WebSocket button is clicked", async () => {
        const { getByText } = render(<WebSocketTest />);

        const button = getByText("Test WebSockets");
        fireEvent.click(button);

        expect(getByText("WebSocket Result: Emitting event...")).toBeInTheDocument();
    });
});
