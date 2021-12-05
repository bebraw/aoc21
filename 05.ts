type Coordinate = {
  x: number;
  y: number;
};

type Line = {
  from: Coordinate;
  to: Coordinate;
};

const lines: Line[] = (await Deno.readTextFile("./5-test-input.txt")).split(
  "\n",
).map(
  (s) => ({
    from: {
      x: parseFloat(s.split(" ")[0].split(",")[0]),
      y: parseFloat(s.split(" ")[0].split(",")[1]),
    },
    to: {
      x: parseFloat(s.split(" ")[2].split(",")[0]),
      y: parseFloat(s.split(" ")[2].split(",")[1]),
    },
  }),
);
const hits = calculateHits(lines);

console.log(lines, hits);

function calculateHits(lines: Line[]): Record<string, number> {
  const hits: Record<string, number> = {};

  lines.forEach(({ from, to }) => {
    if (from.x === to.x) {
      Array.from(
        new Array(Math.abs(to.y - from.y) + 1).keys(),
        (v) => v + Math.min(to.y, from.y),
      )
        .forEach(
          (y) => {
            if (hits[`${from.x}-${y}`]) {
              hits[`${from.x}-${y}`]++;
            } else {
              hits[`${from.x}-${y}`] = 1;
            }
          },
        );
    } else if (from.y === to.y) {
      Array.from(
        new Array(Math.abs(to.x - from.x) + 1).keys(),
        (v) => v + Math.min(to.x, from.x),
      )
        .forEach(
          (x) => {
            if (hits[`${x}-${from.y}`]) {
              hits[`${x}-${from.y}`]++;
            } else {
              hits[`${x}-${from.y}`] = 1;
            }
          },
        );
    }
  });

  return hits;
}
