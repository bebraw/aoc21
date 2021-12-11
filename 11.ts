import { assertArrayIncludes } from "https://deno.land/std@0.117.0/testing/asserts.ts";

type Lights = number[][];

const lights: Lights = (await Deno.readTextFile("./11-test-input.txt"))
  .split(
    "\n",
  ).map((s) => s.split("").map((n) => parseInt(n, 10)));
const miniTestSteps = getMiniTestSteps();
const testSteps = getTestSteps();

assertArrayIncludes(step(miniTestSteps[0]), miniTestSteps[1]);
assertArrayIncludes(step(miniTestSteps[1]), miniTestSteps[2]);
// assertArrayIncludes(step(testSteps[1]), testSteps[2]);
// assertArrayIncludes(step(testSteps[2]), testSteps[3]);

// TODO
console.log(lights.length);

function step(lights: Lights) {
  // TODO: Flash
  return increment(lights);
}

function increment(lights: Lights) {
  return lights.map((line) =>
    line.map((n) => {
      let newN = n + 1;

      if (newN > 9) {
        newN = 0;
      }

      return newN;
    })
  );
}

// TODO: Model flash behavior here
function flash(lights: Lights) {
  return lights.map((line, x) =>
    line.map((n, y) => {
      if (n === 0) {
        // TODO: Update neighbours
      }

      return n;
    })
  );
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
      line.trim().split("").map((s) => parseInt(s, 10))
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
      line.trim().split("").map((s) => parseInt(s, 10))
    )
  );
}
