import Foundation

func compose<T>(_ ts: (T) -> T...) -> (T) -> T {
    return { (_ arg: T) -> T in
        var result: T = arg
        for t in ts {
            result = t(result)
        }
        return result
    }
}

func concat(_ append: String) -> (String) -> String {
    return { (str) -> String in return str + " " +  append }
}

func repeatString(_ times: Int) -> (String) -> String {
    return { (str) -> String in return Array(repeating: str, count: Int(times)).joined(separator: "") }
}

func remove(_ repl: String) -> (String) -> String {
    return { (str) -> String in return str.replacingOccurrences(of: repl, with: "") }
}

func main() {
    let str = "Hello "
    let processText = compose(
        concat("World!"),
        repeatString(3),
        remove("!")
    )
    print(processText(str))
}

main()
