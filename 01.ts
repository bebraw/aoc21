const lines = (await Deno.readTextFile("./1-input.txt")).split("\n").map((s) =>
  parseInt(s, 10)
);
const amountOfLargerThanEarlier = lines.map((v, i) =>
  (i > 0 && v > lines[i - 1] ? 1 : 0) as number
).reduce((a, b) => a + b, 0);
const amountOfLargerThanEarlierWithWindow = lines.map((_v, i) =>
  (lines[i + 1] + lines[i + 2] + lines[i + 3] >
      lines[i] + lines[i + 1] + lines[i + 2]
    ? 1
    : 0) as number
).reduce((a, b) => a + b, 0);

console.log(amountOfLargerThanEarlier, amountOfLargerThanEarlierWithWindow);
