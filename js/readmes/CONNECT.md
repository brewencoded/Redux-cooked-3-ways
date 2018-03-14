# Connecting redux to views

Connecting redux to views is the part of this writing where all of the previous material comes full circle. While I have chosen to use React you can use any framework or library you want. Many have built in solutions. Vue.js has vuex(Redux-like), Angular has ng-redux, and React has react-redux. I'll show you how to connect the two without using a library.

### React
React is a simple library. It's just the view portion of the app. Components have lifecycle events to manage their state and when state changes, they can update themselves.
```javascript
// a simple react component
class Greeting extends React.Component {
  // The method responsible for creating our html
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

We won't go too deep into React since that isn't the focus here. We need just enough to understand what is happening in the code.

### Stateless-functional components
Stateless components are components that calculate their state on every render. They do not store or remember it. This is perfect for implementing a smart-dumb component design. This can be accomplished in Angular and React. 

React:
```javascript
// The simplest possible stateless functional component
const MyComponent = (props) => (
    <p>
        {props.text}
    </p>
);
```

Angular:
```javascript
// same as previous example in Angular
import { Component } from '@angular/core';

@Component({
    selector: 'my-component',
    template: `
    <p>
        {{text}}
    </p>
    `
})
export class MyComponent {
  @Input() text;
}
```

Both of these components take data that is passed to them from a smart component, and display it. They do not worry about maintaining those values or anything else.

### Getting state from the store
First step to gettting data into our components is to pull it from the store.
```javascript
// combine our reduers
const reducers = combineReducers({
    storeSectionOne: myFirstReducer,
    storeSectionTwo: mySecondReducer
});
// Null for a default value of our store
const store = createStore(null, reducers);
// render our DOM with the current store's state
ReactDOM.render(
    <App store={store} />,
    document.getElementById('app')
);
```

Now that our app has access to the store we can pull the state and pass it to any additional components
```javascript
const App: React.SFC<IAppProps> = ({ store }) => {
    const state = store.getState();
    return (
        <div>
            <MyComponent someData={state.storeSectionOne}></MyComponent>
        </div>
    );
};
```

### Watching for changes
Pulling state from the store is great, but it doesn't help if we don't dynamically update when something changes. There are some pretty good libraries for this but we'll implement a simple one of our own, using our `onChange` handler vía the `subscribe` method.
```javascript
const render = (): void => {
    ReactDOM.render(
        <App store={store} />,
        document.getElementById('app')
    );
};

store.subscribe(render);
```

I wouldn't call this the most efficient way propogate changes by any means, but it is the simplest. Recreating that functionality is beyond the scope of what we're learning here.

### Allowing components to dispatch
This is where things get a bit more involved. Our views need to be able to `dispatch` actions. Lets try the naíve implementation.
```javascript
const App: React.SFC<IAppProps> = ({ store }) => {
    const state = store.getState();
    return (
        <div>
            <MyComponent dispatch={store.dispatch} someData={state.storeSectionOne}></MyComponent>
        </div>
    );
};

const MyComponent = (props) => {
    const doThing = () => {
        props.dispatch(MyAction);
    };
    return (
        <button
            onClick={doThing}
        >
        </button>
    );
};
```

This certainly seems to work, but we've added an additional responsibility to a component that shouldn't have to worry about the store or dispatch. We have a more complex component now. If only there was a way to take simple functions and combine them together into a single piece. :)

### connect
Let's use our good friend Functional Programming to solve our complexity issue and maybe even pull our function out into a simple testable unit.
```javascript
const connect = (mapDispatchToProps, dispatch: Dispatcher) =>
    (Component) => // take a functional component as an argument
        (props) => Component({ // return a functional component as an argument
            ...props,
            ...mapDispatchToProps(dispatch)
        });
```

A function that returns a function, that returns another function? Almost seems more complex. Let's break this down first, then we can see how it makes our implementation more declarative and decoupled.
```javascript
const connect = (mapDispatchToProps, dispatch) => 
```
We have a function that takes in a function as it's first argument and our dispatch method as it's second argument.

```javascript
(Component) => (props) => Component
``` 
We return a function that accepts a functional component as it's argument and returns a functional component. That functional component is essentially decorating our component.

```javascript
Component({
    ...props,
    ...mapDispatchToProps(dispatch)
});
```
What we have done here is take a Component and decorate it with dispatchable props and normal props. To understand how the mapping works let's see how we would implement `mapDispatchTopProps`.

```javascript
const mapDispatchToProps = (dispatch) => ({
    someAction: (arg) {
        dispatch(SomeAction);
    },
    someOtherAction: (arg1, arg2) {
        dispatch(SomeOtherAction);
    }
});
```
Thanks to the closure, we now have dispatch in scope. We only needed to pass in dispatch once, and now all of the props we have specified have access to it. We can now define the functionality in the smart component and pass it to the dumb component.

```javascript
const mapDispatchToProps = (dispatch: Dispatcher) => ({
    doThing: (thing: string) => dispatch(SomeAction(thing))
});

const App: React.SFC<IAppProps> = ({ store }) => {
    const ComponentWithDispatch = connect(mapDispatchToProps, store.dispatch)(MyComponent);
    return (
        <div>
            <ComponentWithDispatch
                someData={state.storeSectionOne}
                text="Click Me"
            >
            </ComponentWithDispatch>
        </div>
    );
};

const MyComponent = (props) => {
    return (
        <button
            onClick={() => props.doThing('random argument')}
        >
            {props.text}
        </button>
    );
};
```

The line to pay attention to here is `const ComponentWithDispatch = connect(mapDispatchToProps, store.dispatch)(MyComponent);`. If we read it from left to right we see that we are getting a Component that has dispatch capabilities, by connecting our mapping function and dispatch to MyComponent. Looking past the functional techniques, This allows us to focus on what we want from our code instead how to get it. We've encapsulated the implementation, but at the same time our functions are generic and decoupled, so we have a very testable code base.
