import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './views/container/App';

import createStore from './store/createStore';
import combineReducers from './helpers/combineReducers';

import {
    TodoReducer
} from './reducers';

const reducers = combineReducers({
    todo: TodoReducer
});
const store = createStore(reducers); 

const render = (): void => {
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
