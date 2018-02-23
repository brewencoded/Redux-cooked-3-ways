import { IStoreState } from "../store/createStore";
import { IAction } from "../actions/IAction";

// Takes a map of reducers
const combineReducers = (reducers) =>
    // returns a fn that passes the action to each reducer
    // if the reducers are properly implemented, they will return the correct portion of each state
    // we then combine this together using reduce and return the new state
    (state: IStoreState | Object = {}, action: IAction) => Object.keys(reducers)
        .reduce((nextState: IStoreState | Object, key: string) => {
            nextState[key] = reducers[key]( state[key], action);
            return nextState;
        }, {});

export default combineReducers;
