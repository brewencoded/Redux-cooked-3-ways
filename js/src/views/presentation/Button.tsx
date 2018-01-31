import * as React from 'react';

const baseStyle: React.CSSProperties = {
    color: 'white',
    borderRadius: 4,
    borderColor: 'transparent',
    padding: '10px',
    outline: 0,
    cursor: 'pointer',
};
const todoStyle: React.CSSProperties = Object.assign({}, baseStyle, {
    backgroundColor: '#4caf50',
});
const doneStyle: React.CSSProperties = Object.assign({}, baseStyle, {
    backgroundColor: '#ff3860',
});

export interface IButtonProps {
    done: boolean;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const Button: React.SFC<IButtonProps> = (props) => {
    let style;
    if (props.done) {
        style = todoStyle;
    } else {
        style = doneStyle;
    }
    return (
        <button
            style={style}
            onClick={props.onClick}
        >
            {props.done ? 'Remove' : 'Done'}
        </button>
    );
};

export default Button;