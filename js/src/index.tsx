import * as React from 'react';
import * as ReactDOM from 'react-dom';

import createStore from './Store';
import combineReducers from './helpers/combineReducers';
import Button from './views/Button';
import Concatter from './views/Concatter';
import Counter from './views/Counter';

import {
  CountReducer,
  ConcatReducer
} from './reducers';

const reducers = combineReducers({
  counter: CountReducer,
  concat: ConcatReducer
});
const store = createStore(reducers);

// This is our provider: binds to the store and feeds the dumb views
const App = (props) => {
  return (
    <div>
      <Counter dispatch={store.dispatch} store={store.getState().counter}/>
      <Concatter dispatch={store.dispatch} store={store.getState().concat}/>
    </div>
  );
};

const render = () => {
  console.log(store.getState())
  ReactDOM.render(
    <App state={store.getState()} />,
    document.getElementById('app')
  );
};

store.subscribe(render);

render();

if (module.hot) {
  module.hot.accept();
}
