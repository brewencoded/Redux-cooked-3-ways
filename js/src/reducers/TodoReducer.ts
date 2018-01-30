import {
    ADD_TODO,
    COMPLETE_TODO,
    REMOVE_TODO
} from '../constants';

const InitialState = [];

const TodoReducer = (state = InitialState, action) => {
    if (!action) {
        return state;
    }

    switch(action.type) {
        case ADD_TODO:
        return [
            ...state,
            action.payload.todo
          ]
        case COMPLETE_TODO:
            return state.map(todo =>
                (todo.id === action.payload.id) 
                ? {...todo, done: !todo.done}
                : todo
            );
        case REMOVE_TODO:
            return state.filter((todo) => todo.id != action.payload.id);
        default:
            return state;
    }
};

export default TodoReducer;
