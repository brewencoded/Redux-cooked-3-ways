import { Dispatcher } from "../store/createStore";

const connect = (mapDispatchToProps, dispatch: Dispatcher) =>
    (Component) => 
        (props) => Component({
            ...props,
            ...mapDispatchToProps(dispatch)
        });

export default connect;
