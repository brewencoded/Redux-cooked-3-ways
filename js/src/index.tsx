import axios from 'axios';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './views/container/App';
import createStore from './store/createStore';
import combineReducers from './helpers/combineReducers';

import {
    TodoReducer,
    UserReducer
} from './reducers';
import {
    ProfileAction,
    TodosAction
 } from './actions';

const reducers = combineReducers({
    todo: TodoReducer,
    user: UserReducer
});

const store = createStore(null, reducers);

const checkForCredentials = (dispatch) => {
    const token = localStorage.getItem('todoAppToken');
    const profileThunk = ProfileAction(dispatch);
    const todosThunk = TodosAction(dispatch);
    if (token) {
        profileThunk(token);
        todosThunk(token);
    }
};

const render = (): void => {
    console.dir(store.getState());
    ReactDOM.render(
        <App store={store} />,
        document.getElementById('app')
    );
};

store.subscribe(render);

render();

checkForCredentials(store.dispatch);

if (module.hot) {
    module.hot.accept();
}
