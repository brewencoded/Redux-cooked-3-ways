// Arg first composition

const composeFactory = (arg) =>
	(...fns) =>
		fns.reduce((acc, fn) => fn(acc), arg);


const concat = (append) => (str) => str + append;
const repeat = (times) => (str) => str.repeat(times);
const split = (by) => (str) => str.split(by);

const compose = composeFactory('Hello World');
const result = compose(
	concat('!'),
  	repeat(2),
  	split(' ')
);

console.log(result);


// Function first composition

const composer = (...fns) =>
	(arg) =>
		fns.reduce((acc, fn) => fn(acc), arg);

const processText = composer(
	concat('!'),
  	repeat(2),
  	split(' ')
);

console.log(processText('Hello Again'));
		