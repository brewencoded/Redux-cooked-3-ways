# Prerequisite concepts

Before we get started we need to introduce a few functional concepts to make some of the code easier to follow.

### Higher-order functions
A higher-order function is simply a function that can take a function as an argument and return a function.

```javascript
function foo(fn) {
    return fn();
}
foo(function () {
    console.log('bar');
}); // bar
// AND
function bar() {
    return function helloFn() {
        console.log('hello world');
    }
}
// which allows us to do:
bar()(); // hello world
// or
let helloFn = bar();
helloFn(); // hello world
```

### Closures
A closure is a function scope that is capable of remembering the variables set in it's scope after is has been used.

```javascript
function foo() {
    var closureVar = 'Hello World';
    return function() {
        console.log(closureVar);
    }
}
var helloFn = foo();
helloFn(); // Hello World

// A more advanced example
function bar() {
    var closureVar = 'temp';
    return {
        changeVar: function(newVal) {
            closureVar = newVal;
        },
        printVar: function() {
            console.log(closureVar);
        }
    };
}
var closureStuff = bar();
closureStuff.printVar(); // temp
closureStuff.changeVar('Hello Closures');
closureStuff.printVar(); // Hello Closures
```
The benefits of this capability will be come more 

### Partial function application
Sometimes we have multiple function that all have one argument in common. Wouldn't it be convenient if we could pass that in once and pass the rest in later?

```javascript
// Contrived but it gets the point across
function greet(word) {
    return function (audience) {
        console.log(word + ' ' + audience);
    }
}

var helloGreeting = greet('Hello');

helloGreeting('World'); // Hello World
helloGreeting('Mister'); // Hello Mister
helloGreeting('Madam'); // Hello Madam
```

This is a very important concept since it allows us to inject dependencies using closures.
We'll se some more concrete and useful examples in the implementation.

### Reducer functions
This is a scary term for a very simple concept. Reducers take an object and some changes that need to be performed to it and returns a single state. It reduces multiple disparate parts into a single part.

The built in reduce function is a common example of this
```javascript
var changesToState = [
    {
        type: 'remove',
        property: 'initial'
    },
    {
        type: 'add',
        property: 'a',
        value: 'a'
    },
    {
        type: 'add',
        property: 'b',
        value: 'b'
    }
];
var initialState = {
    initial: 'initial'
};
var reducedState = changesToState.reduce(function (currentState, change) {
    var newState = currentState;
    switch(change.type) {
        case 'add':
            newState[change.property] = change.value;
            return newState;
        case 'remove':
            delete newState[change.property];
            return newState;
        default:
            return currentState;
    }
}, initialState);
console.dir(initialState); // { a: 'a', b: 'b' }
```

A simpler example of a reducer is a simple function that takes a state and a change and returns the new state
```javascript
var state = {
    count: 0
};
function reducer(state, change) {
    if (change.type === 'increment') {
        return Object.assign({}, state, {
            count: state.count + 1
        });
    }
    if (change.type === 'decrement') {
        return Object.assign({}, state, {
            count: state.count - 1
        });
    }
}
var incremented = reducer(state, { type: 'increment' }); // { count: 1 }
var decremented = reducer(incremented, { type: 'decrement' }); // { count: 0 }
```

### Some ES6 sugar

Throughout the codebase I'll be using ES6 and typescript. A useful feature that cleans up the Higher order functions is the fat arrow `=>`. This improves readablity of higher order functions so that you can focus on what is happening in each line.
```javascript
const greet = (word) => (person) => console.log(word + ' ' + person);
// To make it a bit more readable
const greet = (word) =>
    (person) =>
        console.log(word + ' ' + person); 
```
Another useful technique i'll use a lot is the spread operator `...var`. This has a lot of useful applications but i'll be using it mainly to reduce state.
```javascript
const oldState = {
    a: 'a',
    b: 'b'
};
const newState = {
    ...oldState,
    c: 'c'
};

console.dir(newState); // { a: 'a', b: 'b', c: 'c' }
```

Learning to code and in a way that allows you to read what is happening instead of why and how, is called declarative programming. Imperative programming is the practice of writing code that describes how to do something very precisely.

Functional programming focuses on being declarative. Since this is not the focus of this project we won't go any more in depth. Just know that the code will look different than you are used to.

You are wrapping functionality to create the simplest lines of code that describes what you want to get, instead of creating a few line that describe how to get to a desired result.