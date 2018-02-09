import {
    ADD_TODO,
    COMPLETE_TODO,
    REMOVE_TODO,
    FETCH_PENDING,
    FETCH_FAIL,
    FETCH_SUCCESS
} from '../constants';
import ITodoModel from '../models/ITodoModel';
import { IAction } from '../actions/IAction';

const InitialState = {
    todos: [],
    fetchStatus: null
};

const TodoReducer = (state = InitialState, action: IAction) => {
    if (!action) {
        return state;
    }

    switch(action.type) {
        case ADD_TODO:
            return {
                ...state,
                todos: [
                    ...state.todos,
                    action.payload.todo 
                ]
            };
        case COMPLETE_TODO:
            return {
                ...state,
                todos: state.todos.map(todo => (todo.id === action.payload.id) 
                    ? {...todo, done: !todo.done}
                    : todo)
            };
        case REMOVE_TODO:
            return {
                ...state,
                todos: state.todos.filter((todo) => todo.id != action.payload.id)
            };
        case FETCH_PENDING:
            return {
                ...state,
                fetchStatus: FETCH_PENDING
            };
        case FETCH_FAIL:
            return {
                ...state,
                fetchStatus: FETCH_FAIL
            };
        case FETCH_SUCCESS:
            return {
                ...state,
                fetchStatus: FETCH_SUCCESS,
                todos: action.payload.data
            }
        default:
            return state;
    }
};

export default TodoReducer;
