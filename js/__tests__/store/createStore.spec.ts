import createStore from '../../src/store/createStore';

describe('createStore', () => {
    test('It should be a function', () => {
        expect(createStore).toBeInstanceOf(Function);
    });
    test('It should return an Object', () => {
        expect(createStore({}, () => null)).toBeInstanceOf(Object);
    });
    describe('Store', () => {
        test('getState should return the current state', () => {
            const store = createStore({}, (state, action) => state);
            expect(store.getState()).toEqual({});
        });
        test('dispatch should call the reducer and onChange', () => {
            const reducer = jest.fn();
            const onChange = jest.fn();
            const store = createStore({}, reducer);
            store.subscribe(onChange);
            store.dispatch({ type: 'Test' });
            expect(reducer.mock.calls.length).toBeGreaterThan(0);
            expect(onChange.mock.calls.length).toBeGreaterThan(0);
        });
        test('dispatch should update the state based on the reducer', () => {
            const initialState = {};
            const expected = {
                test: 'Test'
            };
            const store = createStore({}, (state, action) => action.payload);
            store.subscribe(() => null);
            store.dispatch({ type: 'Test', payload: expected });
            expect(store.getState()).toEqual(expected);
        });
    });
});