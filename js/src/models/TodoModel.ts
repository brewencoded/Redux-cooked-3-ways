import { v1 } from 'uuid';
import ITodoModel from './ITodoModel';

export type TodoConstructor = (options?) => ITodoModel;

export interface TodoProps {
    text: string;
    id: string | null
    done: boolean;
}

export interface Todo {
    construct: TodoConstructor;
    props: TodoProps;
    proto: {}
}

const Todo: Todo = {
    construct(options): ITodoModel {
        const instance:ITodoModel = Object.create(this.proto);
        const props: TodoProps = Object.assign({}, this.props, options);
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
