import { assertArrayIncludes } from "https://deno.land/std@0.117.0/testing/asserts.ts";

type Lights = Light[][];
type Light = { count: number; flashedAlready?: boolean };

const lights: Lights = (await Deno.readTextFile("./11-test-input.txt"))
  .split(
    "\n",
  ).map((s) => s.split("").map((n) => ({ count: parseInt(n, 10) })));
const miniTestSteps = getMiniTestSteps();
const testSteps = getTestSteps();

/*
printLights(miniTestSteps[0]);
printLights(step(miniTestSteps[0]));
printLights(miniTestSteps[1]);
printLights(step(miniTestSteps[1]));
*/

assertArrayIncludes(
  pickCounts(step(miniTestSteps[0])),
  pickCounts(miniTestSteps[1]),
);
assertArrayIncludes(
  pickCounts(step(miniTestSteps[1])),
  pickCounts(miniTestSteps[2]),
);
assertArrayIncludes(pickCounts(step(testSteps[1])), pickCounts(testSteps[2]));
assertArrayIncludes(pickCounts(step(testSteps[2])), pickCounts(testSteps[3]));

// TODO
console.log(lights.length);

function printLights(lights: Lights) {
  console.log(pickCounts(lights).map((line) => line.join("")).join("\n"));
  console.log();
}

function pickCounts(lights: Lights) {
  return lights.map((line) =>
    line.map((n) => {
      return n.count;
    })
  );
}

function step(lights: Lights) {
  return flashLights(incrementLights(reset(lights)));
}

function reset(lights: Lights) {
  return lights.map((line) =>
    line.map((n) => {
      n.flashedAlready = false;

      return n;
    })
  );
}

function incrementLights(lights: Lights) {
  return lights.map((line) => line.map(incrementLight));
}

// Mutates
function incrementLight(n: Light) {
  if (!n.flashedAlready) {
    n.count++;

    if (n.count > 9) {
      n.count = 0;
    }
  }

  return n;
}

function flashLights(lights: Lights) {
  return lights.map((line, y) =>
    line.map((n, x) => flashLight(n, x, y, lights))
  );
}

// Mutates
function flashLight(n: Light, x: number, y: number, lights: Lights) {
  if (n.count === 0 && !n.flashedAlready) {
    const neighbours = getNeighbours(lights, x, y);

    n.flashedAlready = true;

    neighbours.forEach((o) => flashLight(o.light, o.x, o.y, lights));
    neighbours.forEach((o) => incrementLight(o.light));
    neighbours.forEach((o) => flashLight(o.light, o.x, o.y, lights));
  }

  return n;
}

function getNeighbours(
  lights: Lights,
  x: number,
  y: number,
): { light: Light; x: number; y: number }[] {
  const topLeft = getLight(lights, x - 1, y - 1);
  const topMiddle = getLight(lights, x - 1, y);
  const topRight = getLight(lights, x - 1, y + 1);
  const midLeft = getLight(lights, x, y - 1);
  const midRight = getLight(lights, x, y + 1);
  const bottomLeft = getLight(lights, x + 1, y - 1);
  const bottomMiddle = getLight(lights, x + 1, y);
  const bottomRight = getLight(lights, x + 1, y + 1);

  const ret = [
    topLeft,
    topMiddle,
    topRight,
    midLeft,
    midRight,
    bottomLeft,
    bottomMiddle,
    bottomRight,
  ].filter(isDefined);

  // @ts-ignore There's something wrong with the return type
  return ret;
}

function getLight(
  lights: Lights,
  x: number,
  y: number,
): { light: Light; x: number; y: number } | undefined {
  const light = isDefined(lights[y]) ? lights[y][x] : undefined;

  return isDefined(light) ? { light: light as Light, x, y } : undefined;
}

function isDefined(s: unknown) {
  return typeof s !== "undefined";
}

function getMiniTestSteps() {
  return [
    `11111
  19991
  19191
  19991
  11111`,
    `34543
  40004
  50005
  40004
  34543`,
    `45654
  51115
  61116
  51115
  45654`,
  ].map((s) =>
    s.split("\n").map((line) =>
      line.trim().split("").map((s) => ({ count: parseInt(s, 10) }))
    )
  );
}

function getTestSteps() {
  return [
    `5483143223
  2745854711
  5264556173
  6141336146
  6357385478
  4167524645
  2176841721
  6882881134
  4846848554
  5283751526`,
    `6594254334
  3856965822
  6375667284
  7252447257
  7468496589
  5278635756
  3287952832
  7993992245
  5957959665
  6394862637`,
    `8807476555
  5089087054
  8597889608
  8485769600
  8700908800
  6600088989
  6800005943
  0000007456
  9000000876
  8700006848`,
    `0050900866
  8500800575
  9900000039
  9700000041
  9935080063
  7712300000
  7911250009
  2211130000
  0421125000
  0021119000`,
  ].map((s) =>
    s.split("\n").map((line) =>
      line.trim().split("").map((s) => ({ count: parseInt(s, 10) }))
    )
  );
}
