import { TodoReducer } from '../../src/reducers'
import {
    ADD_TODO,
    REMOVE_TODO,
    COMPLETE_TODO,
    FETCH_PENDING, 
    FETCH_SUCCESS,
    FETCH_FAIL,
    SAVE_PENDING,
    SAVE_SUCCESS,
    SAVE_FAIL
} from '../../src/constants';

const InitialState = {
    todos: [],
    fetchStatus: null,
    persistStatus: null
};
const mockTodo = {
    text: 'test',
    id: 'testId',
    done: false
};

describe('Todo Reducer', () => {
    test('It should be a function', () => {
        expect(TodoReducer).toBeInstanceOf(Function);
    });
    test('ADD_TODO should add a todo to a state object', () => {
        const action = {
            type: ADD_TODO,
            payload: {
                todo: {
                    text: 'test',
                    id: 'testId',
                    done: false
                }
            }
        };
        expect(TodoReducer(InitialState, action)).toEqual({
            todos: [mockTodo],
            fetchStatus: null,
            persistStatus: null 
        });

    });
    test('REMOVE_TODO should remove a todo from state', () => {
        const action = {
            type: REMOVE_TODO,
            payload: {
                id: 'testId'
            }
        };
        const state = {
            ...InitialState,
            todos: [mockTodo]
        };
        expect(TodoReducer(state, action)).toEqual(InitialState);
    });
    test('COMPLETE_TODO should set done to true', () => {
        const action = {
            type: COMPLETE_TODO,
            payload: {
                id: 'testId'
            }
        };
        const state = {
            ...InitialState,
            todos: [mockTodo]
        };
        expect(TodoReducer(state, action).todos[0].done).toBeTruthy(); 
    });
    test('FETCH_PENDING should set fetchStatus', () => {
        const action = {
            type: FETCH_PENDING
        };
        expect(TodoReducer(InitialState, action)).toEqual({
            ...InitialState,
            fetchStatus: FETCH_PENDING
        });
    });
    test('FETCH_SUCCESS should set the todos and fetchStatus', () => {
        const action = {
            type: FETCH_SUCCESS,
            payload: {
                data: [mockTodo]
            }
        };
        expect(TodoReducer(InitialState, action)).toEqual({
            todos: [mockTodo],
            fetchStatus: FETCH_SUCCESS,
            persistStatus: null
        });
    });
    test('FETCH_FAIL should set the fetchStatus', () => {
        const action = {
            type: FETCH_FAIL
        };
        expect(TodoReducer(InitialState, action)).toEqual({
            ...InitialState,
            fetchStatus: FETCH_FAIL
        });
    });
    test('SAVE_PENDING should set persistStatus', () => {
        const action = {
            type: SAVE_PENDING
        };
        expect(TodoReducer(InitialState, action)).toEqual({
            ...InitialState,
            persistStatus: SAVE_PENDING
        });
    });
    test('SAVE_SUCCESS should set persistStatus', () => {
        const action = {
            type: SAVE_SUCCESS
        };
        expect(TodoReducer(InitialState, action)).toEqual({
            ...InitialState,
            persistStatus: SAVE_SUCCESS
        });
    });
    test('SAVE_FAIL should set persistStatus', () => {
        const action = {
            type: SAVE_FAIL
        };
        expect(TodoReducer(InitialState, action)).toEqual({
            ...InitialState,
            persistStatus: SAVE_FAIL
        });
    });
    test('Missing action should return state', () => {
        expect(TodoReducer(InitialState, null)).toEqual(InitialState);
    });
    test('Invalid action type should return state', () => {
        const action = {
            type: 'FAKE'
        };
        expect(TodoReducer(InitialState, action)).toEqual(InitialState);
    });
});