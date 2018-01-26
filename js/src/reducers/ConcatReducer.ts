import {
    CONCAT
} from '../constants';

const InitialState = {
    str: ''
};

const ConcatReducer = (state = InitialState, action ) => {
    if (!action) {
        return state;
    }
    switch(action.type) {
        case CONCAT:
            return {
                ...state,
                str: state.str + action.payload.str
            };
        default:
            return state;
    }
};

export default ConcatReducer;