import * as React from 'react';

import {
    IncrementAction
} from '../actions';

const Button = (props) => {
    const click = () => {
        props.dispatch(IncrementAction(1));
    };
    return (
       <button onClick={click}>Click Me</button>
    );
};

export default Button;
