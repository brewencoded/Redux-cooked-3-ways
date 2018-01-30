import {
    COMPLETE_TODO
} from '../constants';

const CompleteTodo = (id) => {
    return {
        type: COMPLETE_TODO,
        payload: {
            id
        }
    };
};

export default CompleteTodo;
