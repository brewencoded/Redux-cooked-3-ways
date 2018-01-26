import * as React from 'react';
import * as ReactDOM from 'react-dom';

import createStore from './Store';
import Button from './views/Button';
import {
  IncrementReducer
} from './reducers';

const store = createStore(IncrementReducer);

// This is our provider: binds to the store and feeds the dumb views
const App = (props) => {
  return (
    <div>
      <Button dispatch={store.dispatch} />
      <p>{props.state.count}</p>
    </div>
  );
};

const render = () => {
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
