import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './views/container/App';

import createStore from './store/createStore';
import combineReducers from './helpers/combineReducers';

import {
    TodoReducer,
    UserReducer
} from './reducers';

const reducers = combineReducers({
    todo: TodoReducer,
    user: UserReducer
});

const initialState = localStorage.getItem('appStore') ? JSON.parse(localStorage.getItem('appStore')) : null; 
const store = createStore(initialState, reducers);

const render = (): void => {
    localStorage.setItem('appStore', JSON.stringify(store.getState()));
    ReactDOM.render(
        <App store={store} />,
        document.getElementById('app')
    );
};

store.subscribe(render);

render();

if (module.hot) {
    module.hot.accept();
}
