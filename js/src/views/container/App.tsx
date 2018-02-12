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

export interface IAppProps {
    store: IStore;
}

const appStyles = {
    margin: 0,
    padding: 0
};

// get a reference to dispatch and attach it to the components
// by wrapping the SFC and overriding props
const mapDispatchToForm = (dispatch) => ({
    submit: (todo) => dispatch(AddTodo(todo))
});
const mapDispatchToTodos = (dispatch) => ({
    completeTodo: (id) => dispatch(CompleteTodo(id)),
    removeTodo: (id) => dispatch(RemoveTodo(id))
});
const mapDispatchToLogin = (dispatch) => {
    const loginThunk = LoginAction(dispatch);
    return {
        login: (email, password) => loginThunk(email, password)
    };
};

const saveTodos = (dispatch) => (todos, token) => SaveAction(dispatch)(todos, token);

// This is our provider: binds to the store and feeds the dumb views
const App: React.SFC<IAppProps> = ({ store }) => {
    const FormWithDispatch = connect(mapDispatchToForm, store.dispatch)(Form);
    const TodoListWithDispatch = connect(mapDispatchToTodos, store.dispatch)(TodoList);
    const LoginFormWithDispatch = connect(mapDispatchToLogin, store.dispatch)(LoginForm);
    
    const save = () => {
        saveTodos(store.dispatch)(store.getState().todo.todos, localStorage.getItem('todoAppToken'));
    }

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
                    todoStore={store.getState().todo}
                    save={save}
                />
            </div>
        </div>
    );
};

export default App;
