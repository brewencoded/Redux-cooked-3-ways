import * as React from 'react';
import Todo from '../../models/TodoModel';

const buttonStyle: React.CSSProperties = {
    backgroundColor: '#4caf50',
    borderColor: 'transparent',
    borderRadius: 4,
    color: 'white',
    cursor: 'pointer',
    outline: 0,
    padding: '10px',
};

import {
    AddTodo
} from '../../actions';

const TodoForm = ({ submit }) => {
    // Input tracker
    let input;

    return (
        <div>
            <input
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
                +
            </button>
        </div>
    );
};

export default TodoForm;
