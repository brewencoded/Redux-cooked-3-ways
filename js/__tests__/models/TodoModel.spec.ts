import Todo from '../../src/models/TodoModel';

describe('TodoModel', () => {
    test('It should be an object', () => {
        expect(Todo).toBeInstanceOf(Object);
    });
    describe('TodoModel.construct', () => {
        test('It should create an object', () => {
            const todo = Todo.construct({});
            expect(todo).toBeInstanceOf(Object);
        });
        test('It should have 3 properties', () => {
            const todo = Todo.construct({});
            expect(todo).toHaveProperty('text');
            expect(todo).toHaveProperty('id');
            expect(todo).toHaveProperty('done');
        });
        test('It should have a prototype of Todo.proto', () => {
            const todo = Todo.construct({});
            expect(Object.getPrototypeOf(todo)).toEqual(Todo.proto);
        });
        test('It should combine passedin props with the base object', () => {
            const todo = Todo.construct({ test: 'test' });
            expect(todo).toHaveProperty('text');
            expect(todo).toHaveProperty('id');
            expect(todo).toHaveProperty('done');
            expect(todo).toHaveProperty('test'); 
        });
    })
});
