// ReduxTest.tsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { incrementValue, decrementValue } from "../../store/reducer";
import { RootState } from "../../types/types";

const ReduxTest = () => {
    const value = useSelector((state: RootState) => state.test.value);
    const dispatch = useDispatch();

    const handleIncrement = () => {
        dispatch(incrementValue());
    };

    const handleDecrement = () => {
        dispatch(decrementValue());
    };

    return (
        <div>
            <button type='button' className='btn btn-primary me-2' onClick={handleIncrement}>Increment</button>
            <button type='button' className='btn btn-primary me-2' onClick={handleDecrement}>Decrement</button>
            <p><b>Value: </b> {value}</p>
        </div>
    );
};

export default ReduxTest;
