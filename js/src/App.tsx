import * as React from 'react';

import Button from './views/Button';
import Concatter from './views/Concatter';
import Counter from './views/Counter';

// This is our provider: binds to the store and feeds the dumb views
const App = (props) => {
  return (
    <div>
      <Counter dispatch={props.store.dispatch} store={props.store.getState().counter}/>
      <Concatter dispatch={props.store.dispatch} store={props.store.getState().concat}/>
    </div>
  );
};

export default App;
