import {
    LOGIN_PENDING,
    LOGIN_SUCCESS,
    LOGIN_FAIL
} from '../../src/constants';
import { LoginAction } from '../../src/actions';

const mockEmail = 'test@test.com';
const mockPassword = 'test';

const mockPending = {
    type: LOGIN_PENDING
};
const mockFailed = {
    type: LOGIN_FAIL,
    payload: {
        status: 401,
        message: ''
    }
};
const mockSuccess = {
    type: LOGIN_SUCCESS,
    payload: {
        status: 200,
        data: {},
        token: 'test'
    }
};

const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn(),
};
const myGlobal: any = global;
myGlobal.localStorage = localStorageMock;

// mock axios
jest.mock('axios', () => ({
    get: jest.fn((url) => {
        if (url.includes('email=test@test.com') && url.includes('password=test')) {
            return Promise.resolve({ status: 200, data: { profile: {}, token: 'test' } });
        } else {
            return Promise.resolve({ status: 401, data: mockFailed.payload });
        }
    })
}));

describe('Login action', () => {
    test('It should return a function', () => {
        const dispatch = jest.fn();
        expect(LoginAction(dispatch)).toBeInstanceOf(Function);
    });
    test('It should call dispatch', () => {
        const dispatch = jest.fn();
        const thunk = LoginAction(dispatch);
        return thunk(mockEmail, mockPassword).then(() => {
            expect(dispatch.mock.calls.length).toBeGreaterThan(0);
        });
    })
    test('It should dispatch a success action', () => {
        const dispatch = jest.fn();
        const thunk = LoginAction(dispatch);
        return thunk(mockEmail, mockPassword).then(() => {
            const [ pending, success ] = dispatch.mock.calls;
            expect(pending[0]).toEqual(mockPending);
            expect(success[0]).toEqual(mockSuccess);
        });
    });
    test('It should dispatch a fail action', () => {
        const dispatch = jest.fn();
        const thunk = LoginAction(dispatch);
        return thunk('wrong', 'wrong').then(() => {
            const [ pending, failed ] = dispatch.mock.calls;
            expect(pending[0]).toEqual(mockPending);
            expect(failed[0]).toEqual(mockFailed);
        });
    });
});
