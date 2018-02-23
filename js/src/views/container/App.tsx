import * as React from 'react';

import Form from './Form';
import TodoList from '../presentation/TodoList';

import {
    AddTodo,
    CompleteTodo,
    RemoveTodo,
    LoginAction,
    ProfileAction,
    SaveAction
} from '../../actions';

import {
    IStore,
    Dispatcher
} from '../../store/createStore';

import connect from '../../helpers/connect';
import LoginForm from './LoginForm';
import { LOGIN_SUCCESS, LOGIN_PENDING } from '../../constants/index';
import ITodoModel from '../../models/ITodoModel';

export interface IAppProps {
    store: IStore;
}

const appStyles = {
    margin: 0,
    padding: 0
};

// get a reference to dispatch and attach it to the components
// by wrapping the SFC and overriding props
const mapDispatchToForm = (dispatch: Dispatcher) => ({
    submit: (todoText: string) => dispatch(AddTodo(todoText))
});
const mapDispatchToTodos = (dispatch: Dispatcher) => ({
    completeTodo: (id: string) => dispatch(CompleteTodo(id)),
    removeTodo: (id: string) => dispatch(RemoveTodo(id))
});
const mapDispatchToLogin = (dispatch: Dispatcher) => {
    const loginThunk = LoginAction(dispatch);
    return {
        login: (email: string, password: string) => loginThunk(email, password)
    };
};

const saveTodos = (dispatch: Dispatcher) => (todos: ITodoModel[], token: string) => SaveAction(dispatch)(todos, token);

// This is our provider: binds to the store and feeds the dumb views
const App: React.SFC<IAppProps> = ({ store }) => {
    const FormWithDispatch = connect(mapDispatchToForm, store.dispatch)(Form);
    const TodoListWithDispatch = connect(mapDispatchToTodos, store.dispatch)(TodoList);
    const LoginFormWithDispatch = connect(mapDispatchToLogin, store.dispatch)(LoginForm);

    const save = () => {
        saveTodos(store.dispatch)(store.getState().todo.present.todos, localStorage.getItem('todoAppToken'));
    };

    return (
        <div style={appStyles}>
            <LoginFormWithDispatch
                 user={store.getState().user}
            />
            <h1 style={{ textAlign: 'center' }}>Todo</h1>
            <div style={{ padding: '0 10px 0 10px' }}>
                <FormWithDispatch
                    save={save}
                />
                <TodoListWithDispatch
                    todoStore={store.getState().todo.present}
                    save={save}
                />
            </div>
        </div>
    );
};

export default App;
