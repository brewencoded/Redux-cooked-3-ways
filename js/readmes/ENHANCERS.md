# Reducer Enhancers

Let's say we wanted to keep track of our state. Every time state changes we want to store that in a history stack. This would give us the ability to look at how the store is changing overtime making debugging easier. What if we wanted to step through that history? We could set breakpoints but we can only go forward through breakpoints. What if we wantedt o be able to undo and redo history?

In traditional MVC apps this is very difficult since you have to track every model that maintains your state, and any internal view state as well. In Redux we have a single immutable store where each change can be seen as a snapshot of app state. Let's see how we can implement state history and undo/redo functionality

### KISS
We could modify each reducer to snapshot into a global object, but that would be considered a side-effect

We could intercept the onChange callback, but that might also lead to side effects and possible mutations. We would not get access to the actions that caused the state change.

We could create middleware wrapping the dispatch method on the store. This seems like a good approach but it could affect other parts of the application and change the way we have to dispatch. It's adding more complexity.

### Enhancing
Why not reducers? They are already responsible for changing the state of our application, so this seems like a much more logical place to put them. We already said this was a bad idea. It adds complexity to our reducers if they do more than reduce state.

In that case Let's turn to a tried an true functional programming way of wrapping functionality. We'll decorate our reducer so that we don't have to change the way they or anything else works. We will add an enhancement to them.

```javascript
const UndoableEnhancer = (reducer: Function): UndoableReducer => {
    const InitialState: IUndoableState<any> = {
        past: [],
        present: reducer(undefined, {}),
        future: []
    };
    return (state: IUndoableState<any> = InitialState, action: IAction): IUndoableState<any> => {
        const { past, present, future } = state
        if (!action) {
            return state;
        }
 
        switch (action.type) {
            case 'UNDO':
                const previous = past[past.length - 1]
                const newPast = past.slice(0, past.length - 1)
                return {
                    past: newPast,
                    present: previous,
                    future: [present, ...future]
                }
            case 'REDO':
                const next = future[0]
                const newFuture = future.slice(1)
                return {
                    past: [...past, present],
                    present: next,
                    future: newFuture
                }
            default:
                // Delegate handling the action to the passed reducer
                const newPresent = reducer(present, action);
                if (present === newPresent) { // TODO: check for actual equality
                    return state
                }
                return {
                    past: [...past, present],
                    present: newPresent,
                    future: []
                }
        }
    };
};

const UndoableReducer = UndoableEnhancer(MyReducer);

const reducers = combineReducers({
    undoableStuff: UndoableReducer,
    doableStuff: MyOtherReducer
});
```

That's a lot to digest so let's break this down a bit.

```javascript
const UndoableEnhancer = (reducer) => {
    ...
    return (state, action) =>
```
We have a function that takes a reducer as an argument and returns a signature that looks exactly like our reducers. That is because it is a reducer. A reducer enhancer is a reducer that decorates another reducer giving it more functionality or changing the way it works.

```javascript
switch (action.type) {
    case 'UNDO':
       ... 
    case 'REDO':
       ... 
    default:
       ... 
}
```
We have a switch statment that takes a works based on actions like any other reducer. The difference here, is that it takes the result of a reducer and reduces that using a state object that has the single purpose of creating history. We've essentially created a nested state where each heirarchy has it's own reducers.

```javascript
const UndoableReducer = UndoableEnhancer(MyReducer);

const reducers = combineReducers({
    undoableStuff: UndoableReducer,
    doableStuff: MyOtherReducer
});
```
Here we see yet another example of encapsulating functionality to make our code declarative. Out implementations remain decoupled, testable, and read out sensibly. Mission accomplished.
