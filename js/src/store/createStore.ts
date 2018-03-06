import { IAction } from '../actions/IAction';
import { ITodoState } from '../reducers/TodoReducer';
import { IUserState } from '../reducers/UserReducer';
import { IUndoableState } from '../reducers/UndoableEnhancer';

export interface IStoreState {
    todo: IUndoableState<ITodoState>,
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
        getState: () => ({ ...state }),
        subscribe: (fn: Function) => onChange = fn,
        dispatch: (action: IAction) => {
            console.dir(action);
            state = reducer(state, action);
            onChange({ ...state });
        }
    }
};

export default createStore;
