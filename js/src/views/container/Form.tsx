import * as React from 'react';
import Todo from '../../models/TodoModel';

const buttonStyle: React.CSSProperties = {
    color: 'white',
    backgroundColor: '#4caf50',
    borderRadius: 4,
    borderColor: 'transparent',
    padding: '10px',
    outline: 0,
    cursor: 'pointer',
};

import  {
    AddTodo
} from '../../actions';

const TodoForm = ({ submit }) => {
    // Input tracker
    let input;
  
    return (
        <div>
            <input
                placeholder="Add a todo"
                ref={node => { input = node; }}
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
