import * as React from 'react';

import Button from './views/Button';
import Concatter from './views/Concatter';
import Counter from './views/Counter';

import {
    IStore,
    Dispatcher
} from './store/createStore';

export interface IAppProps {
    store: IStore
}

// This is our provider: binds to the store and feeds the dumb views
const App: React.SFC<IAppProps> = (props) => (
    <div>
        <Counter dispatch={props.store.dispatch} state={props.store.getState().counter}/>
        <Concatter dispatch={props.store.dispatch} state={props.store.getState().concat}/>
    </div>
);

export default App;
