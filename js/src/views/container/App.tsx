import * as React from 'react';

import Form from './Form';
import TodoList from '../presentation/TodoList';

import {
    AddTodo,
    CompleteTodo,
    RemoveTodo
} from '../../actions';

import {
    IStore,
    Dispatcher
} from '../../store/createStore';

import connect from '../../helpers/connect';

export interface IAppProps {
    store: IStore
}

// get a reference to dispatch and attach it to the components
// by wrapping the SFC and overriding props
const mapDispatchToForm = (dispatch) => ({
    submit: (todo) => dispatch(AddTodo(todo))
});
const mapDispatchToTodos = (dispatch) => ({
    completeTodo: (id) => dispatch(CompleteTodo(id)),
    removeTodo: (id) => dispatch(RemoveTodo(id))
});

// This is our provider: binds to the store and feeds the dumb views
const App: React.SFC<IAppProps> = ({ store }) => {
    const FormWithDispatch = connect(mapDispatchToForm, store.dispatch)(Form);
    const TodoListWithDispatch = connect(mapDispatchToTodos, store.dispatch)(TodoList);
    return (
        <div>
            <FormWithDispatch />
            <TodoListWithDispatch
                todos={store.getState().todo}
            />
        </div>
    );
};

export default App;
