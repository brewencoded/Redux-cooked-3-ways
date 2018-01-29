import {
    INCREMENT
} from '../constants';
import {
    IConcatState
} from '../reducers/ConcatReducer';
import {
    IAction
} from '../actions/IAction';
import {
    ICountState
} from '../reducers/CountReducer';

export interface IStoreState {
    counter: ICountState,
    concat: IConcatState
}

export type Subscriber = (fn: Function) => void;
export type Dispatcher = (action: IAction) => void;
export type StateGetter = () => IStoreState;

export interface IStore {
    getState: StateGetter;
    subscribe: Subscriber;
    dispatch: Dispatcher;
}
  
const createStore = (reducer): IStore => {
    let onChange;
    let state: IStoreState = reducer({}, {
        type: INCREMENT,
        payload: {
            amount: 0
        }
    });
    return {
        getState: () => state,
        subscribe: (fn: Function) => onChange = fn,
        dispatch: (action: IAction) => {
            state = reducer(state, action);
            onChange();
        }
    }
};

export default createStore;
