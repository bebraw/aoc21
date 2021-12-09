type Weights = number[][];

const weights: Weights = (await Deno.readTextFile("./9-test-input.txt"))
  .split(
    "\n",
  ).map((s) => s.split("").map((s) => parseInt(s, 10)));
// const lowestPoints = findLowestPoints(weights);
// @ts-ignore: TODO: Above has wrong return type
// const riskLevel = calculateRiskLevel(lowestPoints);
const basins = findBasins(weights);
// @ts-ignore findBasins return too broad type
basins.sort((a, b) => b - a);
// @ts-ignore findBasins return too broad type
const score = basins.slice(0, 3).reduce((a, b) => a * b, 1);

console.log(basins, score);

function findBasins(lines: Weights) {
  return lines.flatMap((line, y) =>
    line.map((value, x) => {
      // TODO: Clean up undefined handling + repetition
      const prevX = line[x - 1];
      const nextX = line[x + 1];
      const prevY = (y > 0 ? lines[y - 1][x] : undefined) as number;
      const nextY = (y + 1 < lines.length
        ? lines[y + 1][x]
        : undefined) as number;
      const isLowestPoint = (isDefined(prevX) ? prevX > value : true) &&
        (isDefined(nextX) ? nextX > value : true) &&
        (isDefined(prevY) ? prevY > value : true) &&
        (isDefined(nextY) ? nextY > value : true);

      if (isLowestPoint) {
        const basin = {};

        calculateBasin(basin, lines, x, y);

        // printBasin(lines, basin);

        return Object.keys(basin).length;
      }

      return false;
    })
  ).filter((v) => v !== false);
}

function printBasin(lines: Weights, basin: Record<string, boolean>) {
  console.log(
    lines.map((line, y) =>
      line.map((value, x) => basin[`${x}-${y}`] ? value : ".")
    ).join("\n"),
  );
  console.log();
}

function calculateBasin(
  basin: Record<string, boolean>,
  lines: Weights,
  x: number,
  y: number,
) {
  const line = lines[y];
  const value = line[x];
  const prevX = line[x - 1];
  const nextX = line[x + 1];
  const prevY = (y > 0 ? lines[y - 1][x] : undefined) as number;
  const nextY = (y + 1 < lines.length ? lines[y + 1][x] : undefined) as number;

  if (value === 9) {
    return;
  }

  basin[`${x}-${y}`] = true;

  if (isDefined(prevX) && prevX - value === 1) {
    calculateBasin(basin, lines, x - 1, y);
  }
  if (
    isDefined(nextX) && x + 1 < line.length && nextX - value === 1
  ) {
    calculateBasin(basin, lines, x + 1, y);
  }
  if (isDefined(prevY) && prevY - value === 1) {
    calculateBasin(basin, lines, x, y - 1);
  }
  if (
    isDefined(nextY) && y + 1 < lines.length && nextY - value === 1
  ) {
    calculateBasin(basin, lines, x, y + 1);
  }
}

function findLowestPoints(lines: Weights) {
  return lines.flatMap((line, y) =>
    line.map((value, x) => {
      // TODO: Clean up undefined handling + repetition
      const prevX = line[x - 1];
      const nextX = line[x + 1];
      const prevY = (y > 0 ? lines[y - 1][x] : undefined) as number;
      const nextY = (y + 1 < lines.length
        ? lines[y + 1][x]
        : undefined) as number;

      return (isDefined(prevX) ? prevX > value : true) &&
        (isDefined(nextX) ? nextX > value : true) &&
        (isDefined(prevY) ? prevY > value : true) &&
        (isDefined(nextY) ? nextY > value : true) && value;
    })
  ).filter((v) => v !== false);
}

function calculateRiskLevel(lowestPoints: (number)[]) {
  return lowestPoints.reduce((a, b) => a + b + 1, 0);
}

function isDefined(v: unknown) {
  return typeof v !== "undefined";
}
