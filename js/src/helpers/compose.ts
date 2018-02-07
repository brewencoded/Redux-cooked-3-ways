const compose = (...fns) => x => fns.reduce((v, fn) => fn(v), x);

export default compose;
