import combineReducers from '../../src/helpers/combineReducers';

describe('combineReducers', () => {
    test('It should return a function', () => expect(combineReducers({
        fnOne: () => null,
        fnTwo: () => null
    })).toBeInstanceOf(Function));

    test('It should call all functions passed in', () => {
        const fnA = jest.fn();
        const fnB = jest.fn();
        const fnC = jest.fn();
        const reducer = combineReducers({ fnA, fnB, fnC });
        reducer({}, { type: 'TEST' });
        expect(fnA.mock.calls.length).toBeGreaterThan(0);
        expect(fnB.mock.calls.length).toBeGreaterThan(0);
        expect(fnC.mock.calls.length).toBeGreaterThan(0);
    });

    test('It should return updated state', () => {
        const increment = (state, action) => ({ ...state, count: state.count + 1 });
        const reducer = combineReducers({
            increment
        });
        expect(reducer({ increment: { count: 1 }}, { type: 'INCREMENT' })).toEqual({
            increment: {
                count: 2
            }
        });
    });
})