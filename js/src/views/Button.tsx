import * as React from 'react';

const style: React.CSSProperties = {
    color: 'white',
    backgroundColor: '#4caf50',
    borderRadius: 4,
    borderColor: 'transparent',
    padding: '10px',
    outline: 0,
    cursor: 'pointer',
};

export interface IButtonProps {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => any
}

const Button: React.SFC<IButtonProps> = (props) => (
    <button style={style} onClick={props.onClick}>
        {props.children}
    </button>
);

export default Button;
