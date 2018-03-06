# The store

The store is the most important part of the app. It contains state, data, and errors that will drive all of the views. Think of it as the source of truth for the app's data and state.

### createStore()

This is one of the more complex functions we'll run into. It uses a closure to create private variables and state.
```javascript
const createStore = (initialState, reducer): IStore => {
    let state;
    let onChange;
};
```
We could've used an object to get similar functionality, but we would have to expose the app state. When state is private it protects it from being modified in any other way other than the publicly exposed methods. This helps us keep our focus on immutabilty and side-effect free programming.

We initialize the store using either an initial state that we pass in (useful for state saved in a database) or our reducer functions that will calculate the proper shape of our state. We'll get into reducers in a later section.

### getState()

Because we are trying to keep things immutable and maintain one-way data flow in out app, we make sure we never directly interact with our state. We use `getState()` to return a shallow copy of the current state. We use our good friend the spread operator, to destructure the state object into a new object and return that `{ ...state }`

### subscribe()

If you are familiar with publish/subscribe patterns, this will be very familiar. It's basically the same concept, except in most cases, especially in React, you will only need a single subscription at the root level.
```javascript
const createStore = (initialState, reducer): IStore => {
    let onChange;
    return {
        subscribe: (fn: Function) => onChange = fn
    }
};
```
All this function does is set the private onChange variable. When the store changes it will call this function and pass in the new store.

### dispatch()

This is a driving force between the views and the store. The dispatcher will pass actions to reducers which update the store. In a on-way flowing circle from view, to action creator, to reducer, to store, and then back to view, events are triggered using this method.
```javascript
// take in an action
dispatch: (action: IAction) => {
    // pass the action to the reducer or reducers, which will combine all changes into a single new state
    state = reducer(state, action);
    // we set the new state an let the subscriber know that there has been a change to the store
    onChange();
}
```
