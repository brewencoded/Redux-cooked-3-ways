import { v1 } from 'uuid';

const Todo = {
    construct(options) {
        const instance = Object.create(this.proto);
        const props = Object.assign({}, this.props, options);
        Object.keys(props).forEach((prop) => instance[prop] = props[prop]);
        instance.id = v1();
        return instance;
    },
    props: {
        text: '',
        id: null,
        done: false
    },
    proto: {}
};

export default Todo;
