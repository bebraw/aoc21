type Fish = number;

const fishes: Fish[] = (await Deno.readTextFile("./6-input.txt")).split(
  ",",
).map((s) => parseInt(s, 10));
const steps = generateSteps(fishes, 80);
const lastFishes = steps[steps.length - 1].length;

// console.log("Steps:", steps.map((step) => step.join(",")), lastFishes);
console.log("Steps:", lastFishes);

function generateSteps(fishes: Fish[], amount: number) {
  let previousResult = fishes;

  return [fishes].concat(
    Array.from(new Array(amount).keys()).map((_i) => {
      previousResult = step(previousResult);

      return previousResult;
    }),
  );
}

function step(fishes: Fish[]) {
  const newFishes: Fish[] = [];

  return fishes.map((fish) => {
    if (fish === 0) {
      newFishes.push(8);

      return 6;
    }

    return fish - 1;
  }).concat(newFishes);
}
