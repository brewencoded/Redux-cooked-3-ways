import {
    INCREMENT,
    DECREMENT
} from '../constants';

const InitialState = {
    count: 0
};
  
const CountReducer = (state = InitialState, action) => {
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