import * as React from 'react';
import Button from './Button';
import {
    DecrementAction,
    IncrementAction,
    ConcatAction
  } from '../actions';

const Counter = (props) => {
    const increment = () => {
        props.dispatch(IncrementAction(1));
    };
    const decrement = () => {
        props.dispatch(DecrementAction(1));
    };
    return (
        <div>
            <Button onClick={increment}>Increment</Button>
            <Button onClick={decrement}>Decrement</Button>
            <p>{props.store.count}</p>
        </div>
    );
};

export default Counter;
