const locations: number[] = (await Deno.readTextFile("./7-input.txt"))
  .split(
    ",",
  ).map((s) => parseInt(s, 10));

console.log(findTheCheapestMove(locations));

function findTheCheapestMove(locations: number[]) {
  const options = Array.from(new Array(Math.max.apply(null, locations)).keys());

  return Math.min.apply(
    null,
    options.map((o) => getFuelSpentWhileMoving(locations, o)),
  );
}

function getFuelSpentWhileMoving(locations: number[], position: number) {
  let fuelSpent = 0;

  locations.forEach((l) => {
    fuelSpent += Math.abs(l - position);
  });

  return fuelSpent;
}
