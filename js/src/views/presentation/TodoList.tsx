import * as React from 'react';
import Todo from './Todo';
import connect from '../../helpers/connect';

import  {
    AddTodo
} from '../../actions';

const TodoList = ({ todos, completeTodo, removeTodo }) => {
    // Input tracker
    let list = todos.map((todo) => (
        <Todo key={todo.id} {...todo} completeTodo={completeTodo} removeTodo={removeTodo} />
    ));
  
    return (
        <ul>
            {list}
        </ul>
    );
};

export default TodoList;
