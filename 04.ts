type BingoSheet = number[][];

const lines = (await Deno.readTextFile("./4-test-input.txt")).split("\n");
const numbers = lines[0].split(",").map((n) => parseInt(n, 10));
const bingoSheets = getBingoSheets(lines);
const firstBingoMatch = findFirstBingoMatch(bingoSheets, numbers);

console.log(numbers, bingoSheets, firstBingoMatch);

function getBingoSheets(lines: string[]) {
  const ret: BingoSheet[] = [];
  let accumulator: BingoSheet = [];

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

function findFirstBingoMatch(sheets: BingoSheet[], numbers: number[]) {
  for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j < sheets.length; j++) {
      if (checkBingoMatch(sheets[j], numbers.slice(0, i))) {
        return sheets[j];
      }
    }
  }
}

function checkBingoMatch(sheet: BingoSheet, numbers: number[]) {
  const matches = sheet.map((row) => row.map((v) => numbers.includes(v)));

  let hasRowMatch = false;
  matches.forEach((row) => {
    if (row.every((r) => r === true)) {
      hasRowMatch = true;
    }
  });

  let hasColumnMatch = false;
  transpose(matches).forEach((column) => {
    if (column.every((r) => r === true)) {
      hasColumnMatch = true;
    }
  });

  return hasRowMatch || hasColumnMatch;
}

function transpose(sheet: unknown[][]) {
  const ret: unknown[][] = [];

  sheet.forEach((row) => {
    row.forEach((v, j) => {
      if (ret.length < j + 1) {
        ret.push([v]);
      } else {
        ret[j].push(v);
      }
    });
  });

  return ret;
}
