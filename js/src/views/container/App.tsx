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
import LoginForm from './LoginForm';

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

// This is our provider: binds to the store and feeds the dumb views
const App: React.SFC<IAppProps> = ({ store }) => {
    const FormWithDispatch = connect(mapDispatchToForm, store.dispatch)(Form);
    const TodoListWithDispatch = connect(mapDispatchToTodos, store.dispatch)(TodoList);
    return (
        <div style={appStyles}>
            <LoginForm login={(email, password) => console.log(email, password)}/>
            <h1 style={{ textAlign: 'center' }}>Todo</h1>
            <div style={{ padding: '0 10px 0 10px' }}>
                <FormWithDispatch />
                <TodoListWithDispatch
                    todos={store.getState().todo}
                />
            </div>
        </div>
    );
};

export default App;
