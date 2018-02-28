import { UserReducer } from '../../src/reducers';
import {
    LOGIN_PENDING,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    PROFILE_PENDING,
    PROFILE_SUCCESS,
    PROFILE_FAIL
} from '../../src/constants';

const InitialState = {
    name: '',
    email: '',
    loginStatus: ''
};
const mockUser = {
    name: 'test',
    email: 'test@test.com'
};

describe('UserReducer', () => {
    test('It should be a function', () => {
        expect(UserReducer).toBeInstanceOf(Function);
    });
    test('LOGIN_PENDING should set loginStatus', () => {
        const action = {
            type: LOGIN_PENDING
        };
        expect(UserReducer(InitialState, action)).toEqual({
            ...InitialState,
            loginStatus: LOGIN_PENDING
        });
    });
    test('LOGIN_SUCCESS should set all properties', () => {
        const action = {
            type: LOGIN_SUCCESS,
            payload: {
                data: mockUser
            }
        };
        expect(UserReducer(InitialState, action)).toEqual({
            ...mockUser,
            loginStatus: LOGIN_SUCCESS
        });
    });
    test('LOGIN_FAIL should set loginStatus', () => {
        const action = {
            type: LOGIN_FAIL
        };
        expect(UserReducer(InitialState, action)).toEqual({
            ...InitialState,
            loginStatus: LOGIN_FAIL
        });
    });
    test('PROFILE_PENDING should set loginStatus', () => {
        const action = {
            type: PROFILE_PENDING
        };
        expect(UserReducer(InitialState, action)).toEqual({
            ...InitialState,
            loginStatus: PROFILE_PENDING
        });
    })
    test('PROFILE_SUCCESS should set all properties', () => {
        const action = {
            type: PROFILE_SUCCESS,
            payload: {
                data: mockUser
            }
        };
        expect(UserReducer(InitialState, action)).toEqual({
            ...mockUser,
            loginStatus: LOGIN_SUCCESS
        });
    });
    test('PROFILE_FAIL should set loginStatus', () => {
        const action = {
            type: PROFILE_FAIL
        };
        expect(UserReducer(InitialState, action)).toEqual({
            ...InitialState,
            loginStatus: PROFILE_FAIL
        });
    });
    test('Missing action should return state', () => {
        expect(UserReducer(InitialState, null)).toEqual(InitialState);
    });
    test('Invalid action type should return state', () => {
        const action = {
            type: 'FAKE'
        };
        expect(UserReducer(InitialState, action)).toEqual(InitialState);
    });
});