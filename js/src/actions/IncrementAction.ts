import {
  INCREMENT
} from '../constants';

export interface IIncrementAction {
    type: string;
    payload: {
        amount: number
    };
}

const IncrementAction = (amount): IIncrementAction => {
    return {
        type: INCREMENT,
        payload: {
            amount
        }
    };
};

export default IncrementAction;