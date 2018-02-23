import * as React from 'react';
import Todo from '../../models/TodoModel';

const formStyle: React.CSSProperties = {
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
    border: '2px solid #888',
    borderRadius: 4,
    marginRight: 10,
    outline: 0,
    padding: '10px',
};

import {
    AddTodo
} from '../../actions';

export interface ITodoFormProps {
    submit: (text: string) => Promise<any>;
    save: () => void;
}

const TodoForm: React.SFC<ITodoFormProps> = ({ submit, save }) => {
    // Input tracker
    let input: HTMLInputElement;

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
                    save();
                    input.value = '';
                }}
            >
                Add
            </button>
        </div>
    );
};

export default TodoForm;
