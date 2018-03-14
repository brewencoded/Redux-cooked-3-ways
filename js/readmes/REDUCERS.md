# Reducers

Reducers are functions that take in complex data and reduce it into a single peice of data and return it. We've already seen it built into the Array prototype where is serves a similar function.

### In JS

Let's take a look at the most common reducer in JavaScript, `Array.prototype.reduce`
```javascript
const numbers = [1, 2, 3, 4];
const initialState = 0;
const reducer = (currentState, arrayElement) => currentState + arrayElement;
const sum = numbers.reduce(reducer, initialState); // 10
```

Arrays are Functors - Objects that have an internal state and they are not only iterable, but also mappable. While the terminology isn't very important, the concept helps us understand what is happening here. The internal state is being used along with an initial state to create a new state. We are taking two separate things and reducing them into a single thing and returning it.

### In Redux

In redux the reducer specifies how state changes in response to actions. Actions describe what is supposed to happen, but reducers describe how the application's state changes.

So let's look at the anatomy of a reducer as it relates to the store and actions. Everything should start coming together now:
```javascript
// inital state and default value of the reducer
// This is how our state will look in the store
const InitialState = {
    count: 0
};

// our reducer takes in a state that needs to be reduced and an action describing how to reduce it
const reducer = (state = InitialState, action) => {
    // we use a switch statement and the action's type to decide how the state will change
    // we explicitly handle each outcome including returning state as our default
    switch(action.type) {
        case INCREMENT:
            return {
                ...state,
                count: state.count + 1
            };
        case DECREMENT:
            return {
                ...state,
                count: state.count - 1
            };
        default:
            return state;
    }
};

// our action will look something like this
const IncrementAction = {
    type: INCREMENT
};

// send the action to the store which will call the reducer with the current state and this action
store.dispatch(IncrementAction); // state will now look like this: { count: 1 }
```

Though this seems a bit simple, this is what many reducers will look like. We want them to be simple and change as little as possible. This makes changes to our state easy to reason about.

### Combine reducers
Any real application is going to be sufficiently complex that we will need multiple reducers. Rather than changing the complexity of the store or reducers, we can use some of those previous functional programming concepts we learned.
```javascript
// combineReducers.js

const combineReducers = (reducers) =>
    (state, action) => Object.keys(reducers)
        .reduce((nextState, key) => {
            nextState[key] = reducers[key]( state[key], action);
            return nextState;
        }, {});
```

A lot is happening here so let's break this down piece by piece

```javascript
const combineReducers = (reducers) =>
```
We have a fuction that will take a map of reducers (we'll see this soon).

```javascript
    (state, action) => Object.keys(reducers)
```
We are going to return a new function which  takes in state and an action. You may recognize the signature as the same one we saw in our reducers. This is intentional.

```javascript
        .reduce((nextState, key) => {
```
We are using the key and value of each reducer in the map to reduce and return a new state. Remember `Array.prototype.reduce` will take an initial state and we can iterate on that state based on the return value of each reducer.

```javascript
            nextState[key] = reducers[key]( state[key], action);
            return nextState; 
```
Each reducer recieves a portion of the state relevant to them and returns a piece of the new state.

That's all there is to it. Each reducer is responsible for a piece of the state and the `reduce` function will recursively apply each reducer to the state until it has the complete new state.


This is function composition. We take a few simple functions and combine them together so that we can combine it into a single function. The implementation results in very intuitive and declarative code.
