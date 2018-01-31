import * as React from 'react';
import Todo from './Todo';
import connect from '../../helpers/connect';
import ITodoModel from '../../models/ITodoModel';

import {
    AddTodo
} from '../../actions';
import CompleteTodo from '../../actions/CompleteTodo';

const ulStyles: React.CSSProperties = {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
};

export interface ITodoListProps {
    todos: ITodoModel[];
    completeTodo: (id: string) => void;
    removeTodo: (id: string) => void;
}

const TodoList: React.SFC<ITodoListProps> = ({ todos, completeTodo, removeTodo }) => {
    // Input tracker
    const list: JSX.Element[] = todos.map((todo) => (
        <Todo key={todo.id} {...todo} completeTodo={completeTodo} removeTodo={removeTodo} />
    ));

    return (
        <ul style={ulStyles}>
            {list}
        </ul>
    );
};

export default TodoList;
