import { IAction } from '../actions/IAction';
import { ITodoState } from '../reducers/TodoReducer';
import { IUserState } from '../reducers/UserReducer';

export interface IStoreState {
    todo: ITodoState,
    user: IUserState
}

export type Subscriber = (fn: Function) => void;
export type Dispatcher = (action: IAction) => void;
export type StateGetter = () => IStoreState;

export interface IStore {
    getState: StateGetter;
    subscribe: Subscriber;
    dispatch: Dispatcher;
}

const createStore = (initialState, reducer): IStore => {
    let onChange;
    let state: IStoreState = initialState || reducer();
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
