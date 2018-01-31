import * as React from 'react';

const baseStyle: React.CSSProperties = {
    borderColor: 'transparent',
    borderRadius: 4,
    color: 'white',
    cursor: 'pointer',
    outline: 0,
    padding: '10px',
};
const todoStyle: React.CSSProperties = {
    ...baseStyle,
    backgroundColor: '#4caf50',
};
const doneStyle: React.CSSProperties = {
    ...baseStyle,
    backgroundColor: '#ff3860',
};

export interface IButtonProps {
    done: boolean;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.SFC<IButtonProps> = (props) => {
    return (
        <button
            style={props.done ? todoStyle : doneStyle}
            onClick={props.onClick}
        >
            {props.done ? 'Remove' : 'Done'}
        </button>
    );
};

export default Button;
