// ExampleComponent.tsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../../store/reducers/counterReducer";
import { RootState } from "../../store/types";

const ReduxTest: React.FC = () => {
    const count = useSelector((state: RootState) => state.counter.value);
    const dispatch = useDispatch();

    return (
        <div>
            <button onClick={() => dispatch(increment())}>Increment</button>
            <button onClick={() => dispatch(decrement())}>Decrement</button>
            <p><strong>ReduxTest Counter</strong>: {count}</p>
        </div>
    );
};

export default ReduxTest;
