// ReduxTest.test.tsx
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "../../src/store/reducers"; // Assuming you have a rootReducer that combines all reducers
import ReduxTest from "../../src/components/test/ReduxTest";

test("renders the ReduxTest component", () => {
    const store = createStore(rootReducer); // Create a mock store with your rootReducer

    const { getByText } = render(
        <Provider store={store}>
            <ReduxTest />
        </Provider>,
    );

    const incrementButton = getByText("Increment");
    const decrementButton = getByText("Decrement");

    // Initially, the count should be 0
    expect(getByText("ReduxTest Counter: 0")).toBeInTheDocument();

    // Test increment button
    fireEvent.click(incrementButton);
    expect(getByText("ReduxTest Counter: 1")).toBeInTheDocument();

    // Test decrement button
    fireEvent.click(decrementButton);
    expect(getByText("ReduxTest Counter: 0")).toBeInTheDocument();
});
