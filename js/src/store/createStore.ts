import {
    INCREMENT
  } from '../constants';
  
  const createStore = (reducer) => {
    let onChange;
    let state = reducer({}, {
      type: INCREMENT,
      payload: {
        amount: 0
      }
    });
    return {
      getState: () => state,
      subscribe: (fn) => onChange = fn,
      dispatch: (action) => {
        state = reducer(state, action);
        onChange();
      }
    }
  };
  
  export default createStore;
