const lines = (await Deno.readTextFile("./3-input.txt")).split("\n")
  .map((s) => s.split("").map((n) => parseInt(n, 10)));
const mostCommonBits = getMostCommonBits(lines);
const mostCommonValueInDecimal = parseInt(mostCommonBits.join(""), 2);
const leastCommonBits = getLeastCommonBits(lines);
const leastCommonValueInDecimal = parseInt(leastCommonBits.join(""), 2);
const result = mostCommonValueInDecimal * leastCommonValueInDecimal;

console.log(
  mostCommonValueInDecimal,
  leastCommonValueInDecimal,
  result,
);

function getLeastCommonBits(lines: number[][]) {
  const amountOfBits = lines[0].length;

  return Array.from(Array(amountOfBits).keys()).map((i) =>
    getLeastCommonBit(lines, i)
  );
}

function getLeastCommonBit(lines: number[][], position: number) {
  const firstOnes = getBits(lines, position, 1);
  const firstZeros = getBits(lines, position, 0);

  return firstOnes > firstZeros ? 0 : 1;
}

function getMostCommonBits(lines: number[][]) {
  const amountOfBits = lines[0].length;

  return Array.from(Array(amountOfBits).keys()).map((i) =>
    getMostCommonBit(lines, i)
  );
}

function getMostCommonBit(lines: number[][], position: number) {
  const firstOnes = getBits(lines, position, 1);
  const firstZeros = getBits(lines, position, 0);

  return firstOnes > firstZeros ? 1 : 0;
}

function getBits(lines: number[][], position: number, bit: 0 | 1) {
  return lines.filter((l) => l[position] === bit).length;
}
