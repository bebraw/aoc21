import { styles } from "https://deno.land/x/ansi_styles@1.0.0/mod.ts";

type Weights = number[][];

const weights: Weights = (await Deno.readTextFile("./9-input.txt"))
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

console.log(score);

function findBasins(lines: Weights) {
  const allBasin: Record<string, boolean> = {};
  const lowestPoints = findLowestPoints(lines);

  // @ts-ignore
  const ret = lowestPoints.map(([x, y]) => {
    const basin = {};

    calculateBasin(allBasin, basin, lines, x, y);

    return Object.keys(basin).length;
  });

  printBasin(lines, allBasin);

  return ret;
}

function printBasin(lines: Weights, basin: Record<string, boolean>) {
  console.log(
    lines.map((line, y) =>
      line.map((value, x) =>
        basin[`${x}-${y}`]
          ? value
          : `${styles.dim.open}${value}${styles.dim.close}`
      )
    ).join("\n"),
  );
  console.log();
}

function calculateBasin(
  allBasin: Record<string, boolean>,
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

  if (value === 9 || allBasin[`${x}-${y}`]) {
    return;
  }

  allBasin[`${x}-${y}`] = true;
  basin[`${x}-${y}`] = true;

  if (isDefined(prevX)) {
    calculateBasin(allBasin, basin, lines, x - 1, y);
  }
  if (isDefined(nextX)) {
    calculateBasin(allBasin, basin, lines, x + 1, y);
  }
  if (isDefined(prevY)) {
    calculateBasin(allBasin, basin, lines, x, y - 1);
  }
  if (isDefined(nextY)) {
    calculateBasin(allBasin, basin, lines, x, y + 1);
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
        (isDefined(nextY) ? nextY > value : true) && [x, y];
    })
  ).filter((v) => v !== false);
}

function calculateRiskLevel(lowestPoints: (number)[]) {
  return lowestPoints.reduce((a, b) => a + b + 1, 0);
}

function isDefined(v: unknown) {
  return typeof v !== "undefined";
}
