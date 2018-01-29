import  {
    CONCAT
} from '../constants';
import {
    IAction
} from './IAction';

export interface IConcatAction extends IAction {
    payload: {
        str: string
    };
}

const ConcatAction = (str: string): IConcatAction => {
    return {
        type: CONCAT,
        payload: {
            str
        }
    }
};

export default ConcatAction;