fun <A, B, C> compose(f: (B) -> C, g: (A) -> B): (A) -> C {
    return { x -> f(g(x)) }
}

fun<A> composeTwo(f: (A) -> A, g: (A) -> A): (A) -> A {
    return { x -> f(g(x)) }
}

fun addOne(v: Int): Int {
    return v + 1
}

fun addTwo(v: Int): Int {
    return v + 2
}

fun main (args: Array<String>) {
    val addThree = compose(::addOne, ::addTwo)
    val plusThree = composeTwo(::addOne, ::addTwo)
    println(addThree(3))
    println(plusThree(3))
}

