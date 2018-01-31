const connect = (mapDispatchToProps, dispatch) =>
    (Component) => 
        (props) => Component({
            ...props,
            ...mapDispatchToProps(dispatch)
        });


export default connect;
