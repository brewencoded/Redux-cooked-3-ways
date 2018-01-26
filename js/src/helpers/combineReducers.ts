// Takes a map of reducers
const combineReducers = (reducers) =>
    // returns a fn that passes the action to each reducer
    // if the reducers are properly implemented, they will return the correct portion of each state
    // we then combine this together using reduce and return the new state
    (state = {}, action) => Object.keys(reducers)
        .reduce((nextState, key) => {
            nextState[key] = reducers[key]( state[key], action);
            return nextState;
        }, {});

export default combineReducers;
