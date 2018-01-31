import * as React from 'react';
import Todo from '../../models/TodoModel';

const formStyle = {
    marginBottom: 10
};

const buttonStyle: React.CSSProperties = {
    backgroundColor: '#4caf50',
    borderColor: 'transparent',
    borderRadius: 4,
    color: 'white',
    cursor: 'pointer',
    outline: 0,
    padding: '10px',
};

const inputStyle: React.CSSProperties  = {
    padding: '10px',
    borderRadius: 4,
    border: '2px solid #888',
    outline: 0,
    marginRight: 10,
};

import {
    AddTodo
} from '../../actions';

const TodoForm = ({ submit }) => {
    // Input tracker
    let input;

    return (
        <div style={formStyle}>
            <input
                style={inputStyle}
                placeholder="Add a todo"
                ref={(node) => { input = node; }}
            />
            <button
                style={buttonStyle}
                onClick={() => {
                    submit(input.value);
                    input.value = '';
                }}
            >
                Add
            </button>
        </div>
    );
};

export default TodoForm;
