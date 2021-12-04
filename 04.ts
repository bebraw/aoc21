const lines = (await Deno.readTextFile("./4-test-input.txt")).split("\n");
const numbers = lines[0].split(",").map((n) => parseInt(n, 10));
const bingoSheets = getBingoSheets(lines);

console.log(numbers, bingoSheets);

function getBingoSheets(lines: string[]) {
  const ret: number[][][] = [];
  let accumulator: number[][] = [];

  lines.slice(2).forEach((line) => {
    if (line.trim() === "") {
      ret.push(accumulator);
      accumulator = [];
    } else {
      accumulator.push(line.split(" ").filter(Boolean).map((n) => parseInt(n)));
    }
  });

  ret.push(accumulator);

  return ret;
}
