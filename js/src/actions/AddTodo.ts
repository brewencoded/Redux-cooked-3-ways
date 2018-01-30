import {
    ADD_TODO
} from '../constants';
import Todo from '../models/TodoModel';

const AddTodo = (text) => {
    return {
        type: ADD_TODO,
        payload: {
            todo: Todo.construct({ text })
        }
    };
};

export default AddTodo;
