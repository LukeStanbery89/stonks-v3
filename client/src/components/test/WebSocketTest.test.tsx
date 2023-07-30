import React from "react";
import { render, screen } from "@testing-library/react";
import WebSocketTest from "./WebSocketTest";

test("Renders the WebSocketTest component", () => {
    render(<WebSocketTest />);
    expect(screen.getByText("WebSocket Result")).toBeInTheDocument();
});
