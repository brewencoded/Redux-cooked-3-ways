# Actions

From the Redux website: "Actions are payloads of information that send data from your application to your store. They are the only source of information for the store. You send them to the store using `store.dispatch().`"

### Anatomy of an Action

An action should a very simple and pure object. Pure as in unchanging after creation. A Redux convention is to give it a tye and payload property. Type or whatever you use as the equivalent should be the absolute minimum. An action interface should look like:
```javascript
interface IAction {
    type: string;
    payload?: any
}
```

We always have a type to allow the reducers to know how to merge the new data with the store. The payload is the actual data you are sending to the store. May choose different naming conventions.

### Action creators

Sometimes we might have more complex actions that require a bit of logic. For this case we convert it into a function
```javascript
const AddTodo = (text: string): IAddTodoAction => ({
    type: ADD_TODO,
    payload: {
        todo: Todo.construct({ text })
    }
});
```

This is useful for actions that need to take in arguments or calculate values. Just remember that we want to pass in as little data as possible. This makes it easier to manage the changes and debug anything that might go wrong.

As a quick aside, ou may notice that `ADD_TODO` is not a string. Let's pretend there was some assignment earlier on that looked like: `const ADD_TODO = 'ADD_TODO'`. The main benefits we get here are error messages if we mispell anything and autocomplete if your editor supports it.

### Conditional/Multiple dispatches

While this is easy enough to handle we may come to an occasion where we need to perform multiple dispatches based on a particular set of logic. For this, we will want to inject dispatch into our action creator
```javascript
const MyAction = (dispatch) => (myarg) => {
    if(myarg === DO_SOMETHING) {
        dispatch(DoSomething);
    } else {
        dispatch(DoSomethingElse);
    }
};

// We can call it like this
MyAction(store.dispatch)(DO_SOMETHING);
// Or
const myAction = MyAction(store.dispatch);
myAction(DO_SOMETHING);
myAction(DO_SOMETHING_ELSE);
```

If you remember from the [Prerequisites](PREREQS.md) section, we are using the capabilities closures and higer-order functions to inject dependencies into an action creator. This is where partial function application starts to come in handy.

### Async Actions

The most common use case for injecting dispatch, is when dealing with asynchronous actions. Since we will need to dispatch actions to update the store state after each stage of our request we can start by injecting dispatch.
```javascript
const Login = (dispatch: Dispatcher) => (email: string, password: string) => {};
```
Now we add our async calls (I like using the [axios](https://www.npmjs.com/package/axios) library)
```javascript
const Login = (dispatch: Dispatcher) => (email: string, password: string) => {
    dispatch({
        type: LOGIN_PENDING
    });
    const loginResponse = axios.get(`/api/login?email=${email}&password=${password}`, {})
        .then(response => {
            if (response.status === 200) {
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: {
                        status: response.status
                        data: response.data.profile,
                        token: response.data.token
                    }
                });
            } else {
                dispatch({
                    type: LOGIN_FAILED,
                    payload: {
                        status: response.status,
                        message: response.message
                    }
                });
            }
        })
        .catch(err => dispatch({
            type: FETCH_ERROR,
            payload: {
                message: err.message
            }
        }));
};
```
That was a lot to digest. Let's go over this step by step.(And ignore the poor security practices)
First we use the injected dispatch to tell the store that we are trying to login by dispatching a `LOGIN_PENDING` action type.
Next we send our request to keep ourselves honest.
We use the `then` call to dispatch a pass or fail to the store along with anything else it might need to store for our app.
Finally we catch any errors and dispatch the appropriate type so the store can keep a record of what went wrong

### Async/Await

Let's add a bit of JS magic to the mix with the newer async/await feature to clean this code up.
We'll use async so the transpiler knows that it will be an async function
```javascript
const Login = (dispatch: Dispatcher) => async function (email: string, password: string) {};
// or
const Login = (dispatch: Dispatcher) => async (email: string, password: string) => {};
```
Then where we make our async request, we'll add an await to let the app know to wait until the call returns before executing the rest of the function.
```javascript
    const loginResponse = await axios.get(`/api/login?email=${email}&password=${password}`, {});
```
To handle any error calls we can wrap this in a try catch block
```javascript
    try {
        const loginResponse = await axios.get(`/api/login?email=${email}&password=${password}`, {});
    } catch(e) {
       dispatch(/*...*/) 
    }
```
And then we handle the response if it succeeds
```javascript
        if (loginResponse.status === 200) {
            dispatch({
                /*...*/
            });
        } else {
            dispatch({
                /*...*/
            })
        }
```

The two methods are equivalent but async/await is much easier to read at a glance, so I'll be using it for all future async needs.

### We've got the Thunk

Injecting of dependencies and returning a function for use later is a a structure called a thunk. When you see something that looks like:
```javascript
typeof Thunk = (injectable: any) => (...args: any[]) => any;
```
You'll know that it's a [thunk](https://en.wikipedia.org/wiki/Thunk). A thunk is created using partial function application. By now the terminology should be starting to fall into place.
