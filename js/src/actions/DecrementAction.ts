import {
    DECREMENT
} from '../constants';
import { IAction } from './IAction';

export interface IDecrementAction extends IAction {
    payload: {
        amount: number
    };
}

const DecrementAction = (amount: number): IDecrementAction => {
    return {
        type: DECREMENT,
        payload: {
            amount
        }
    };
};
  
export default DecrementAction;