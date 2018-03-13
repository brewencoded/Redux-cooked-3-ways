# The 10,000 meter overview (because metric system)

Let's get an idea of the basic concept behind Redux. Before we dive into the how, we should look at the why.

### Reasonable state
State is difficult. It changes. It can be difficult to debug. Sometimes it's spread over multiple objects. Sometimes the state of one object or view can trigger changes in another kicking off a cascade of state mutations; some unintended. This can make it very difficult to track what is happening and where to set breakpoints. Let's not even talk about testability.

Redux aims to make state management easier. The architecture and best practices in Redux are intended to make state easy to reason about and minimize side effects that could lead to tough debugging issues. Let's explore how Redux attempts to achieve these goals.

### Unidirectional data flow
Unidirectional data flow is a fancy way of saying that data flows in a predetermined path. A view triggers an event. A dispatcher sends an Action, which is caught by the Reducer, and the results are put into the store, which sends the updated state back to the view. This means no 2-way data-binding. In this way we can follow what is happening at each stage of the event. We can event intercept, store history of changes, and rewind it (More on this later).

### Immutability
Immutabilty means no mutations should happen. To put it simply, we should never change an object. Instead, we should create something new or a copy of something existing and return that. The reason for this is side effects. Let's see an example.
```javascript
function incrementedValue(obj) {
    return obj.count += 1;
}
```

What happened here is `obj` has been mutated accidently. We wanted to get the incremented value of our object's count but we also mutated the object itself as a side-effect. This may be an unrealistic example but it illustrates the point that object references can be modified in a different scope.

Let's look at another example.

```javascript
const  = {
  val: 2
};

const increment = () => MyObj.val += 1;

const double = () => MyObj.val *= 2;

increment();
double();
```
If you change the order of the function calls, you can change the result. One function affects the other. This leads to unpredictable results.

This can all be avoid by using immutabilty. Let's see how to fix these issues:
```javascript
const MyObj = {
  val: 2
};

const increment = (x) => ({ ...x, val: x.val + 1 });

const double = (x) => ({ ...x, val: x.val * 2 });

increment(MyObj);
double(MyObj);
```

This may seem limiting. But limiting isn't necessarily a bad thing. You have less to think about, since we now have a strong convention to use and we are avoiding potentially dangerous operations.

### Functional Programming <3
Functional programming techniques are all over the redux code base. In the PREREQS section we'll go over more on it. The main things to understand is that functional programming aims to be pure and side-effect free. When you have pure functions and no side effects, you have extremely testible code, and well-tested code is more reliable code.
