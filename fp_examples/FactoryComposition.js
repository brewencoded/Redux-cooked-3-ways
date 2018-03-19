// Function first composition

const pipe = (...fns) =>
	(arg) =>
		fns.reduce((acc, fn) => fn(acc), arg);

// looksHuman
const looksHuman = ({ eyeColor, hairColor }) => (human) => ({
	...human,
	eyeColor,
	hairColor
});
// canFly
const canFly = (speed) => (thing) => ({
	...thing,
	isflying: false,
	flyingSpeed: speed,
	fly: () => { this.isflying = true; },
	land: () => { this.isflying = false; }
});
// hasSuperStrength
const hasSuperStrength = (lbs) => (superHuman) => ({
	...superHuman,
	strength: `${lbs} lbs`
});
// hasSuperSpeed
const hasSuperSpeed = (mph) => (superHuman) => ({
	...superHuman,
	runningSpeed: `${mph} mph`
});
// createHero
const createHero = ({ name, superName }) => ({
	name,
	superName
});

const givePowers = pipe(
	looksHuman({
		eyeColor: 'blue',
		hairColor: 'black'
	}),
	canFly(1000),
	hasSuperStrength(10000),
	hasSuperSpeed(1000)
);

const superMan = createHero({
	name: 'Clark Kent',
	superName: 'Superman'
});

const superManWithPowers = givePowers(superMan);

console.dir(superManWithPowers);
		