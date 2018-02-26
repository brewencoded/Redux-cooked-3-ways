import {
    ADD_TODO
} from '../src/constants';
import { AddTodo } from '../src/actions';

const mockText = 'Test';
const mockTodoAction = {
    type: ADD_TODO,
    payload: {
        todo: {
            text: mockText,
            id: null, // can't test this dynamically generated value
            done: false
        }
    }
};

describe('Add todo action', () => {
    test('It should return an action object', () => {
        const action = AddTodo(mockText);
        expect(action).toBeDefined();
        expect(action).toHaveProperty('type', mockTodoAction.type);
        expect(action).toHaveProperty('payload');
        expect(action).toHaveProperty('payload.todo.text', mockText); 
        expect(typeof action.payload.todo.id).toBe('string');
        expect(action).toHaveProperty('payload.todo.done', false);
    });
});