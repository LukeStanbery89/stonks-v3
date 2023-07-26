import React from "react";
import { render, screen } from "@testing-library/react";
import XHRTest from "./XHRTest";

test("Renders the XHRTest component", () => {
    render(<XHRTest />);
    expect(screen.getByText("XHR Result")).toBeInTheDocument();
});
