const locations: number[] = (await Deno.readTextFile("./7-input.txt"))
  .split(
    ",",
  ).map((s) => parseInt(s, 10));

console.log(findTheCheapestMove(locations));

function findTheCheapestMove(locations: number[]) {
  const options = Array.from(new Array(Math.max.apply(null, locations)).keys());

  return Math.min.apply(
    null,
    options.map((o) => getFuelSpentWhileMovingPart2(locations, o)),
  );
}

function getFuelSpentWhileMovingPart1(locations: number[], position: number) {
  let fuelSpent = 0;

  locations.forEach((l) => {
    fuelSpent += Math.abs(l - position);
  });

  return fuelSpent;
}

function getFuelSpentWhileMovingPart2(locations: number[], position: number) {
  let fuelSpent = 0;

  locations.forEach((l) => {
    fuelSpent += getWeight(Math.abs(l - position));
  });

  return fuelSpent;
}

function getWeight(n: number) {
  return (n + 1) * (n / 2);
}
