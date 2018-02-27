import User from '../../src/models/UserModel';

describe('UserModel', () => {
    test('It should be an object', () => {
        expect(User).toBeInstanceOf(Object);
    });
    describe('UserModel.construct', () => {
        test('It should create an object', () => {
            const user = User.construct({});
            expect(user).toBeInstanceOf(Object);
        });
        test('It should have 3 properties', () => {
            const user = User.construct({});
            expect(user).toHaveProperty('name');
            expect(user).toHaveProperty('email');
            expect(user).toHaveProperty('loginStatus');
        });
        test('It should have a prototype of User.proto', () => {
            const user = User.construct({});
            expect(Object.getPrototypeOf(user)).toEqual(User.proto);
        });
        test('It should combine passedin props with the base object', () => {
            const user = User.construct({ test: 'test' });
            expect(user).toHaveProperty('name');
            expect(user).toHaveProperty('email');
            expect(user).toHaveProperty('loginStatus');
            expect(user).toHaveProperty('test'); 
        });
    })
});
