const lines = (await Deno.readTextFile("./3-test-input.txt")).split("\n")
  .map((s) => s.split("").map((n) => parseInt(n, 10)));
const mostCommonBits = getMostCommonBits(lines);
const mostCommonValueInDecimal = parseInt(mostCommonBits.join(""), 2);
const leastCommonBits = getLeastCommonBits(lines);
const leastCommonValueInDecimal = parseInt(leastCommonBits.join(""), 2);
const result = mostCommonValueInDecimal * leastCommonValueInDecimal;
const oxygenGeneratorRatingLines = getOxygenGeneratorRating(lines);
const oxygenGeneratorRating = parseInt(
  oxygenGeneratorRatingLines[0].join(""),
  2,
);
const co2RatingLines = getCO2Rating(lines);
const co2Rating = parseInt(co2RatingLines[0].join(""), 2);
const lifeSupportRating = oxygenGeneratorRating * co2Rating;

console.log(result, oxygenGeneratorRating, co2Rating, lifeSupportRating);

function getOxygenGeneratorRating(lines: number[][], i = 0): number[][] {
  const mostCommonBit = getMostCommonBit(lines, i);
  const filteredLines = lines.filter((line) => line[i] === mostCommonBit);

  if (filteredLines.length === 0) {
    return lines;
  }

  if (i > lines.length) {
    return filteredLines;
  }

  return getOxygenGeneratorRating(filteredLines, i + 1);
}

function getCO2Rating(lines: number[][], i = 0): number[][] {
  const leastCommonBit = getLeastCommonBit(lines, i);
  const filteredLines = lines.filter((line) => line[i] === leastCommonBit);

  if (filteredLines.length === 0) {
    return lines;
  }

  if (i > lines.length) {
    return filteredLines;
  }

  return getCO2Rating(filteredLines, i + 1);
}

function getLeastCommonBits(lines: number[][]) {
  const amountOfBits = lines[0].length;

  return Array.from(Array(amountOfBits).keys()).map((i) =>
    getLeastCommonBit(lines, i)
  );
}

function getLeastCommonBit(lines: number[][], position: number) {
  const firstOnes = getBits(lines, position, 1);
  const firstZeros = getBits(lines, position, 0);

  return firstOnes >= firstZeros ? 0 : 1;
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

  return firstOnes >= firstZeros ? 1 : 0;
}

function getBits(lines: number[][], position: number, bit: 0 | 1) {
  return lines.filter((l) => l[position] === bit).length;
}
