import * as React from 'react';

const liStyle: React.CSSProperties = {
    borderBottom: '2px solid #999',
    overflow: 'hidden',
    padding: '4px',
};

const pStyle: React.CSSProperties = {
    backgroundColor: 'transparent',
    float: 'left',
    lineHeight: '2em',
    margin: 0,
    marginRight: 10,
    padding: '1px 10px',
};

const baseStyle: React.CSSProperties = {
    borderColor: 'transparent',
    borderRadius: 4,
    color: 'white',
    cursor: 'pointer',
    float: 'left',
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

export interface ITodoProps {
    text: string;
    id: string;
    done: boolean;
    completeTodo: (id: string) => void;
    removeTodo: (id: string) => void;
}

const Todo: React.SFC<ITodoProps> = ({ text, id, done, completeTodo, removeTodo }) => (
    <li key={id} style={liStyle}>
        <p style={pStyle}>
            {text}
        </p>
        {done
        ?
            <button
                style={doneStyle}
                onClick={() => removeTodo(id)}
            >
                    Remove
            </button>
        :
            <button
                style={todoStyle}
                onClick={() => completeTodo(id)}
            >
                    Complete
            </button>
        }
    </li>
);

export default Todo;
