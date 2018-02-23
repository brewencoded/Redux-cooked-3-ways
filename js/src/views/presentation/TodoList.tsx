import * as React from 'react';
import Todo from './Todo';
import connect from '../../helpers/connect';
import ITodoModel from '../../models/ITodoModel';
import { ITodoState } from '../../reducers/TodoReducer';

import {
    AddTodo
} from '../../actions';
import CompleteTodo from '../../actions/CompleteTodo';

const ulStyles: React.CSSProperties = {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
};

export interface ITodoListProps {
    todoStore: ITodoState;
    completeTodo: (id: string) => void;
    removeTodo: (id: string) => void;
    save: () => void;
}

const TodoList: React.SFC<ITodoListProps> = ({ todoStore, completeTodo, removeTodo, save }) => {
    const completeAndSave = (id: string) => {
        completeTodo(id);
        save();
    };
    const removeAndSave = (id: string) => {
        removeTodo(id);
        save();
    };
    // Input tracker
    const list: JSX.Element[] = todoStore.todos.map((todo) => (
        <Todo
            key={todo.id}
            {...todo}
            completeTodo={completeAndSave}
            removeTodo={removeAndSave}
        />
    ));

    return (
        <ul style={ulStyles}>
            {list}
        </ul>
    );
};

export default TodoList;
