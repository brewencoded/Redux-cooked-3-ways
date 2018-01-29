import {
    CONCAT
} from '../constants';
import {
    IConcatAction
} from '../actions/ConcatAction';

export interface IConcatState {
    str: string;
}

const InitialState: IConcatState = {
    str: ''
};

const ConcatReducer = (state = InitialState, action: IConcatAction ): IConcatState => {
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