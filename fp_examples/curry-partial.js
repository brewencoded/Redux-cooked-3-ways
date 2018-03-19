// Arity
const oneArity = (x) => x;
const twoArity = (x, y) => x + y;
// ...etc

// curry - transform function of n arity into a composition of 1 arity (unary functions)
const xyz = (x, y, z) => x + y + z;
const curry = (f) => (x) => (y) => (z) => f(x, y, z);
const curriedXYZ = curry(xyz);
console.log(curriedXYZ(1)(2)(3));

// partial function application - produce a function of reduced arity by binding fixed values to some of the original function’s arguments
const abc = (a, b, c) => a + b + c;
const partial = (f, a) => (b, c) => f(a, b, c);
const partialABC = partial(abc, 1);
console.log(partialABC(2, 3));