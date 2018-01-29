import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './App';

import createStore from './store/createStore';
import combineReducers from './helpers/combineReducers';

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
