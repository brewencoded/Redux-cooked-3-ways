import {
    COMPLETE_TODO
} from '../constants';
import { IAction } from './IAction';

export interface ICompleteTodoAction extends IAction {
    payload: {
        id: string
    }
}

const CompleteTodo = (id: string): ICompleteTodoAction => ({
    type: COMPLETE_TODO,
    payload: {
        id
    }
});

export default CompleteTodo;
