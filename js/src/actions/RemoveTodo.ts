import {
    REMOVE_TODO
} from '../constants';

const RemoveTodo = (id) => {
    return {
        type: REMOVE_TODO,
        payload: {
            id
        }
    };
};

export default RemoveTodo;
