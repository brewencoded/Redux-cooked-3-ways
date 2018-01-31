import * as React from 'react';
import Todo from './Todo';
import connect from '../../helpers/connect';

import {
    AddTodo
} from '../../actions';

const ulStyles = {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
};

const TodoList = ({ todos, completeTodo, removeTodo }) => {
    // Input tracker
    const list = todos.map((todo) => (
        <Todo key={todo.id} {...todo} completeTodo={completeTodo} removeTodo={removeTodo} />
    ));

    return (
        <ul style={ulStyles}>
            {list}
        </ul>
    );
};

export default TodoList;
