type Fish = number;
type CondensedFishes = Record<number, number>; // number -> count

const fishes: CondensedFishes = condenseFishes(
  (await Deno.readTextFile("./6-input.txt")).split(
    ",",
  ).map((s) => parseInt(s, 10)),
);
// const steps = generateSteps(fishes, 128);
// const lastFishes = steps[steps.length - 1].length;

// console.log("Steps:", steps.map((step) => step.join(",")), lastFishes);
// console.log("Steps:", lastFishes);
console.log("Amount of fishes:", calculateFishes(fishes, 256));

function condenseFishes(fishes: Fish[]): CondensedFishes {
  // TODO: Clean up init
  const ret: CondensedFishes = {
    "0": 0,
    "1": 0,
    "2": 0,
    "3": 0,
    "4": 0,
    "5": 0,
    "6": 0,
    "7": 0,
    "8": 0,
  };

  fishes.forEach((fish) => {
    ret[fish]++;
  });

  return ret;
}

function calculateFishes(fishes: CondensedFishes, amount: number) {
  Array.from(new Array(amount).keys()).forEach((_i) => {
    condensedStep(fishes);
  });

  return Object.values(fishes).reduce((a, b) => a + b);
}

function generateSteps(fishes: Fish[], amount: number) {
  let previousResult = fishes;

  return [fishes].concat(
    Array.from(new Array(amount).keys()).map((_i) => {
      previousResult = step(previousResult);

      return previousResult;
    }),
  );
}

function condensedStep(fishes: CondensedFishes) {
  Object.entries(fishes).map(([number, count]) => {
    const parsedNumber = parseInt(number, 10);

    if (parsedNumber === 0) {
      fishes["8"] += count;
      fishes[parsedNumber] -= count;
      fishes["6"] += count;
    } else {
      fishes[parsedNumber] -= count;
      fishes[parsedNumber - 1] += count;
    }
  });
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
