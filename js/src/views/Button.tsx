import * as React from 'react';

const style = {
    color: 'white',
    backgroundColor: '#4caf50',
    borderRadius: 4,
    borderColor: 'transparent',
    padding: '10px',
    outline: 0,
    cursor: 'pointer',
};

const Button = (props) => (
    <button style={style} onClick={props.onClick}>
        {props.children}
    </button>
);

export default Button;
