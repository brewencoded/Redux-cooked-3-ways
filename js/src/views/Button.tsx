import * as React from 'react';

import {
    IncrementAction
} from '../actions';

const style = {
    color: 'white',
    backgroundColor: '#4caf50',
    borderRadius: 4,
    borderColor: 'transparent',
    padding: '10px',
    outline: 0,
    cursor: 'pointer',
};

const Button = (props) => {
    const click = () => {
        props.dispatch(IncrementAction(1));
    };
    return (
       <button style={style} onClick={click}>Click Me</button>
    );
};

export default Button;
