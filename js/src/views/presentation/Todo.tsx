import * as React from 'react';

const Todo = ({ text, id, done, completeTodo, removeTodo }) => (
    <li key={id}>
        <p>{text}</p>
        {
            done ?
            <button onClick={() => removeTodo(id)}>Remove</button>
            :
            <button onClick={() => completeTodo(id)}>Complete</button>
        }
    </li>
);

export default Todo;
