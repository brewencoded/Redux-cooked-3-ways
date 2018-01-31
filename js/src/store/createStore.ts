import { IAction } from '../actions/IAction';

export interface IStoreState {
    todo
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
    let state: IStoreState = reducer();
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
