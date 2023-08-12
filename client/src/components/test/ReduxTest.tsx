import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../../store/reducers/counterReducer";
import { RootState } from "../../types/types";

const ReduxTest = () => {
    const count = useSelector((state: RootState) => state.counter.value);
    const dispatch = useDispatch();

    return (
        <div>
            <button className="btn btn-primary me-2" onClick={() => dispatch(increment())}>Increment</button>
            <button className="btn btn-primary me-2" onClick={() => dispatch(decrement())}>Decrement</button>
            <p>ReduxTest Counter: {count}</p>
        </div>
    );
};

export default ReduxTest;
