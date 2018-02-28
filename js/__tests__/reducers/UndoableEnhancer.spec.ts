import { UndoableEnhancer } from '../../src/reducers';

const InitialState = {
    past: [],
    present: { name: 'present' },
    future: []
};

describe('UndoableEnhancer', () => {
    test('It should be a function', () => {
        expect(UndoableEnhancer).toBeInstanceOf(Function);
    });
    test('It should return a function', () => {
        const fn = jest.fn();
        expect(UndoableEnhancer(fn)).toBeInstanceOf(Function);
    });
    test('It should call function arg', () => {
        const fn = jest.fn();
        const enhancedFn = UndoableEnhancer(fn);
        expect(fn.mock.calls.length).toBeGreaterThan(0);
    });
    test('It should delegate to the initial reducer if not UNDO or REDO', () => {
        const fn = jest.fn();
        fn.mockReturnValue({ name: 'future' });
        const enhancedFn = UndoableEnhancer(fn);
        const newState = enhancedFn(InitialState, { type: '' });
        // once for initialization
        // once for reduce call
        expect(fn.mock.calls.length).toEqual(2);
        expect(newState).toEqual({
            future: [],
            present: { name: 'future' },
            past: [{ name: 'present' }]
        });
    });
    test('It should UNDO and REDO state', () => {
        const fn = jest.fn();
        fn.mockReturnValue({ name: 'future' });
        const enhancedFn = UndoableEnhancer(fn);

        // set up initial state
        const newState = enhancedFn(InitialState, { type: '' });
        expect(fn.mock.calls.length).toEqual(2);
        expect(newState).toEqual({
            future: [],
            present: { name: 'future' },
            past: [{ name: 'present' }]
        });

        // undo state
        const undoState = enhancedFn(newState, { type: 'UNDO' });
        expect(fn.mock.calls.length).toEqual(2);
        expect(undoState).toEqual({
            future: [{ name: 'future' }],
            present: { name: 'present' },
            past: []
        });

        // redo undone state
        const redoState = enhancedFn(undoState, { type: 'REDO' });
        expect(fn.mock.calls.length).toEqual(2);
        expect(redoState).toEqual({
            future: [],
            present: { name: 'future' },
            past: [{ name: 'present' }]
        }); 
    });

})