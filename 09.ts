type Weights = number[][];

const weights: Weights = (await Deno.readTextFile("./9-test-input.txt"))
  .split(
    "\n",
  ).map((s) => s.split("").map((s) => parseInt(s, 10)));
const lowestPoints = findLowestPoints(weights);
// @ts-ignore: TODO: Above has wrong return type
const riskLevel = calculateRiskLevel(lowestPoints);

console.log(weights, lowestPoints, riskLevel);

function findLowestPoints(lines: Weights) {
  return lines.flatMap((line, i) =>
    line.map((x, j) => {
      // TODO: Clean up undefined handling + repetition
      const prevX = line[j - 1];
      const nextX = line[j + 1];
      const prevY = (i > 0 ? lines[i - 1][j] : undefined) as number;
      const nextY = (i + 1 < lines.length
        ? lines[i + 1][j]
        : undefined) as number;

      return (isDefined(prevX) ? prevX > x : true) &&
        (isDefined(nextX) ? nextX > x : true) &&
        (isDefined(prevY) ? prevY > x : true) &&
        (isDefined(nextY) ? nextY > x : true) && x;
    })
  ).filter((v) => v !== false);
}

function calculateRiskLevel(lowestPoints: (number)[]) {
  return lowestPoints.reduce((a, b) => a + b + 1, 0);
}

function isDefined(v: unknown) {
  return typeof v !== "undefined";
}
