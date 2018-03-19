fun curry(f: (Int, Int, Int) -> Int): (Int) -> (Int) -> (Int) -> Int {
    return { x: Int ->
               { y: Int ->
                   { z: Int ->
                       f(x, y, z)
                    }
                }
            }
}

fun partial(f: (Int, Int, Int) -> Int, a: Int): (Int, Int) -> Int {
    return { b: Int, c: Int -> f(a, b, c) }
}


fun main(args: Array<String>) {
    // Arity
    val oneArity = { x: Int -> x }
    val twoArity = { x: Int, y: Int -> x + y }
    // ...etc

    // curry - transform function of n arity into a composition of 1 arity (unary functions)
    val xyz = { x: Int, y: Int, z: Int -> x + y + z }
    val curriedXYZ = curry(xyz)
    println(curriedXYZ(1)(2)(3))

    // partial function application - produce a function of reduced arity by binding fixed values to some of the original function’s arguments
    val abc = {
        a: Int, b: Int, c: Int -> a + b + c
    }
    val partialABC = partial(abc, 1)
    println(partialABC(2, 3))
}