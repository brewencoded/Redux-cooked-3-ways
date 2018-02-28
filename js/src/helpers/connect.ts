import { Dispatcher } from "../store/createStore";

// Take a function that injects dispatch into function props and attatches them to Component
// along with normal props
const connect = (mapDispatchToProps, dispatch: Dispatcher) =>
    (Component) => // take a functional component as an argument
        (props) => Component({ // return a functional component as an argument
            ...props,
            ...mapDispatchToProps(dispatch)
        });

export default connect;
