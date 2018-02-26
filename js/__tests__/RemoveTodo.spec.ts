import {
    REMOVE_TODO
} from '../src/constants';
import { RemoveTodo } from '../src/actions';

const mockId = 'Test';
const mockTodoAction = {
    type: REMOVE_TODO,
    payload: {
        id: mockId
    }
};

describe('Complete todo action', () => {
    test('It should return an action object', () => {
        const action = RemoveTodo(mockId);
        expect(action).toBeDefined();
        expect(action).toEqual(mockTodoAction);
    });
});
