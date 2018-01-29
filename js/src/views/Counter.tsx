import * as React from 'react';
import Button from './Button';
import {
    DecrementAction,
    IncrementAction,
    ConcatAction
} from '../actions';
import {
    IDecrementAction
} from '../actions/DecrementAction';
import {
    IIncrementAction
} from '../actions/IncrementAction';
import {
    ICountState
} from '../reducers/CountReducer';

export interface ICounterProps {
    dispatch: (action : IDecrementAction | IIncrementAction) => void;
    state: ICountState
}

const Counter: React.SFC<ICounterProps> = (props) => {
    const increment = (): void => {
        props.dispatch(IncrementAction(1));
    };
    const decrement = (): void => {
        props.dispatch(DecrementAction(1));
    };

    return (
        <div>
            <Button onClick={increment}>Increment</Button>
            <Button onClick={decrement}>Decrement</Button>
            <p>{props.state.count}</p>
        </div>
    );
};

export default Counter;
