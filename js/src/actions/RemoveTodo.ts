import {
    REMOVE_TODO
} from '../constants';
import { IAction } from './IAction';

export interface IRemoveTodo extends IAction {
    payload: {
        id: string
    }
}

const RemoveTodo = (id: string): IRemoveTodo => ({
    type: REMOVE_TODO,
    payload: {
        id
    }
});

export default RemoveTodo;
