import * as React from 'react';
import * as ReactDOM from 'react-dom';

import createStore from './Store';
import combineReducers from './helpers/combineReducers';
import Button from './views/Button';
import Concatter from './views/Concatter';
import Counter from './views/Counter';
import App from './App';

import {
  CountReducer,
  ConcatReducer
} from './reducers';

const reducers = combineReducers({
  counter: CountReducer,
  concat: ConcatReducer
});
const store = createStore(reducers);

const render = () => {
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
