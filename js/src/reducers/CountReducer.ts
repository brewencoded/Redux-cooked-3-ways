import {
    INCREMENT,
    DECREMENT
} from '../constants';
import {
    IDecrementAction
} from '../actions/DecrementAction';
import {
    IIncrementAction
} from '../actions/IncrementAction';

export interface ICountState {
    count: number;
}

const InitialState = {
    count: 0
};
  
const CountReducer = (state = InitialState, action: IDecrementAction | IIncrementAction): ICountState => {
    if (!action) {
        return state;
    }
    switch(action.type) {
        case INCREMENT:
            return {
                ...state,
                count: state.count + action.payload.amount
            };
        case DECREMENT:
            return {
                ...state,
                count: state.count - action.payload.amount
            }
        default:
            return state;
    }
};

export default CountReducer;
