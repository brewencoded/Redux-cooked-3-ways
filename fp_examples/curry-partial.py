from functools import reduce
# Arity
oneArity = lambda x: x
twoArity = lambda x, y: x + y
# ...etc

# curry - transform function of n arity into a composition of 1 arity (unary functions)
xyz = lambda x, y, z: x + y + z
curry = lambda f: lambda x: lambda y: lambda z: f(x, y, z)
curriedXYZ = curry(xyz)
print(curriedXYZ(1)(2)(3))

# partial function application - produce a function of reduced arity by binding fixed values to some of the original function’s arguments
abc = lambda a, b, c: a + b + c
partial = lambda f, a: lambda b, c: f(a, b, c)
partialABC = partial(abc, 1)
print(partialABC(2, 3))