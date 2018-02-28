import {
    PROFILE_PENDING,
    PROFILE_SUCCESS,
    PROFILE_FAIL
} from '../../src/constants';
import { ProfileAction } from '../../src/actions';

const mockEmail = 'test@test.com';
const mockPassword = 'test';

const mockPending = {
    type: PROFILE_PENDING
};
const mockFailed = {
    type: PROFILE_FAIL,
    payload: {
        status: 401,
        message: ''
    }
};
const mockSuccess = {
    type: PROFILE_SUCCESS,
    payload: {
        status: 200,
        data: {},
    }
};
const TOKEN = 'abc123';

// mock axios
jest.mock('axios', () => ({
    get: jest.fn((url, opts) => {
        if (opts.headers.Authorization === 'Bearer abc123') {
            return Promise.resolve({ status: 200, data: { profile: {} } });
        } else {
            return Promise.resolve({ status: 401, data: { message: '' }});
        }
    })
}));

describe('Profile action', () => {
    test('It should return a function', () => {
        const dispatch = jest.fn();
        expect(ProfileAction(dispatch)).toBeInstanceOf(Function);
    });
    test('It should call dispatch', () => {
        const dispatch = jest.fn();
        const thunk = ProfileAction(dispatch);
        return thunk(TOKEN).then(() => {
            expect(dispatch.mock.calls.length).toBeGreaterThan(0);
        });
    })
    test('It should dispatch a success action', () => {
        const dispatch = jest.fn();
        const thunk = ProfileAction(dispatch);
        return thunk(TOKEN).then(() => {
            const [ pending, success ] = dispatch.mock.calls;
            expect(pending[0]).toEqual(mockPending);
            expect(success[0]).toEqual(mockSuccess);
        });
    });
    test('It should dispatch a fail action', () => {
        const dispatch = jest.fn();
        const thunk = ProfileAction(dispatch);
        return thunk('wrong').then(() => {
            const [ pending, failed ] = dispatch.mock.calls;
            expect(pending[0]).toEqual(mockPending);
            expect(failed[0]).toEqual(mockFailed);
        });
    });
});
