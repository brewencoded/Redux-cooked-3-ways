fun<T> compose(vararg ts: (T) -> T): (T) -> T {
    return fun(arg: T): T {
        var result: T = arg
        for (t in ts)
            result = t(result)
        return result
    }
}

fun concat(append: String): (String) -> String {
    return { str -> str + " " +  append }
}

fun repeat(times: Int): (String) -> String {
    return { str -> str.repeat(times) }
}

fun remove(repl: String): (String) -> String {
    return { str -> str.replace(repl, "") }
}

// fun<T> compose(vararg ts: (T) -> T) = { arg: T -> ts.fold(arg) { acc, t -> t(acc) } }

// fun concat(append: String) = { str: String -> str + " " +  append }

// fun repeat(times: Int) = { str: String -> str.repeat(times) }

// fun remove(repl: String) = { str: String -> str.replace(repl, "") }

fun main(args: Array<String>) {
    val str = "Hello "
    val processText = compose(
        concat("World!"),
        repeat(3),
        remove("!")
    )
    println(processText(str))
}

