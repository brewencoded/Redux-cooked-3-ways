import connect from '../../src/helpers/connect';

describe('connect', () => {
    test('It should return a function', () => {
        const mapToDispatch = () => null;
        const dispatch = () => null;
        expect(connect(mapToDispatch, dispatch)).toBeInstanceOf(Function);
    });

    test('Its return value should also return a function', () => {
        const mapToDispatch = () => null;
        const dispatch = () => null;
        const FunctionalComponent = () => ({});
        const mappedComponent = connect(mapToDispatch, dispatch)(FunctionalComponent);
        expect(mappedComponent).toBeInstanceOf(Function);
    })

    test('It should attach dispatchable properties', () => {
        const dispatch = jest.fn();
        const mapToDispatch = jest.fn().mockImplementation((dispatcher) => ({
            dispatchThing: () => dispatcher()
        }));
        const FunctionalComponent = jest.fn().mockImplementation((props) => ({ ...props }));
        const mappedComponent = connect(mapToDispatch, dispatch)(FunctionalComponent);
        const renderedComponent = mappedComponent({});
        renderedComponent.dispatchThing();
        expect(FunctionalComponent.mock.calls[0][0]).toHaveProperty('dispatchThing');
        expect(mapToDispatch.mock.calls.length).toBeGreaterThan(0);
        expect(dispatch.mock.calls.length).toBeGreaterThan(0);
        expect(renderedComponent.dispatchThing).toBeInstanceOf(Function);
    });

    test('It should combine dispatchable and plain props', () => {
        const dispatch = jest.fn();
        const mapToDispatch = jest.fn().mockImplementation((dispatcher) => ({
            dispatchThing: () => dispatcher()
        }));
        const FunctionalComponent = jest.fn().mockImplementation((props) => ({ ...props }));
        const mappedComponent = connect(mapToDispatch, dispatch)(FunctionalComponent);
        const renderedComponent = mappedComponent({ test: 'test' });
        renderedComponent.dispatchThing();
        expect(FunctionalComponent.mock.calls[0][0]).toHaveProperty('dispatchThing');
        expect(FunctionalComponent.mock.calls[0][0]).toHaveProperty('test');
        expect(mapToDispatch.mock.calls.length).toBeGreaterThan(0);
        expect(dispatch.mock.calls.length).toBeGreaterThan(0); 
        expect(renderedComponent.dispatchThing).toBeInstanceOf(Function);
        expect(renderedComponent.test).toEqual('test');
    });
});