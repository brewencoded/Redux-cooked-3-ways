from functools import reduce

def compose(*fns):
    return lambda arg: reduce(lambda v, f: f(v), fns, arg)

concat = lambda append: lambda str: str + append
repeat = lambda times: lambda str: str * times
remove = lambda repl: lambda str: str.replace(repl, '')

process_text = compose(
    concat("World!"),
    repeat(3),
    remove("!")
)

print(process_text('Hello Again'))