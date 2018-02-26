import {
    COMPLETE_TODO
} from '../src/constants';
import { CompleteTodo } from '../src/actions';

const mockId = 'testId';
const mockTodoAction = {
    type: COMPLETE_TODO,
    payload: {
        id: mockId
    }
};

describe('Complete todo action', () => {
    test('It should return an action object', () => {
        const action = CompleteTodo(mockId);
        expect(action).toBeDefined();
        expect(action).toEqual(mockTodoAction);
    });
});