import {
    ADD_TODO
} from '../constants';
import Todo from '../models/TodoModel';
import { IAction } from './IAction';
import ITodoModel from '../models/ITodoModel';

export interface IAddTodoAction extends IAction {
    payload: {
        todo: ITodoModel
    }
}

const AddTodo = (text: string): IAddTodoAction => {
    return {
        type: ADD_TODO,
        payload: {
            todo: Todo.construct({ text })
        }
    };
};

export default AddTodo;
