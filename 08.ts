type Character = Set<string>;
type Segments = { begin: Character[]; end: Character[] };

// TODO: Change alignment per column as that's where comparison can be done properly
const segments: Segments[] = (await Deno.readTextFile("./8-input.txt"))
  .split(
    "\n",
  ).map(parseSegment);
// const segmentsPerColumn = columnize(segments);

// console.log(segments);
console.log(evaluateAllSegments(segments));

function parseSegment(s: string) {
  const [begin, end] = s.split("|");

  return {
    begin: begin.trim().split(" ").map((s) => new Set(s.split(""))),
    end: end.trim().split(" ").map((s) => new Set(s.split(""))),
  };
}

function columnize(segments: Segments[]) {
  const ret: Character[][] = Array.from(new Array(10).keys(), () => []);

  segments.forEach(({ begin }) => {
    begin.forEach((s, i) => {
      ret[i].push(s);
    });
    /*end.forEach((s, i) => {
      ret[10 + i].push(s);
    });*/
  });

  return ret;
}

function evaluateAllSegments(segments: Segments[]) {
  return segments.map(evaluateSegments).reduce((a, b) => a + b, 0);
}

function evaluateSegments(segments: Segments) {
  // TODO: Generalize this per display
  const finalSegments: Record<string, string> = {};
  const foundNumbers: Record<string, Character> = {};
  const sixOrNine: Character[] = [];
  let foundNumberAmount = 0;

  segments.end.forEach((segment) => {
    if (hasOne(segment)) {
      foundNumbers[1] = segment;

      foundNumberAmount++;
    }
    if (hasFour(segment)) {
      foundNumbers[4] = segment;

      foundNumberAmount++;
    }
    if (hasSeven(segment)) {
      foundNumbers[7] = segment;

      foundNumberAmount++;
    }
    if (hasEight(segment)) {
      foundNumbers[8] = segment;

      foundNumberAmount++;
    }
    if (hasSixOrNine(segment)) {
      sixOrNine.push(segment);
    }
  });

  if (foundNumbers[1] && foundNumbers[7]) {
    const top = difference(foundNumbers[1], foundNumbers[7])[0];

    finalSegments[top] = "a";
  }

  if (foundNumbers[4] && foundNumbers[7]) {
    console.log(
      "got both 4 and 7",
      foundNumbers[7],
      foundNumbers[4],
      subtract(foundNumbers[7], foundNumbers[4]),
    );
  }

  // TODO: If 5 and 6 are found, then e can be figured out
  // TODO: If 8 and 9 are found, then e can be figured out
  // TODO: Check six and nine
  console.log(
    "final segments",
    finalSegments,
    "six or nine",
    sixOrNine,
  );

  return foundNumberAmount;
}

function hasOne(c: Character) {
  return c.size === 2;
}

function hasFour(c: Character) {
  return c.size === 4;
}

function hasSixOrNine(c: Character) {
  return c.size === 6;
}

function hasSeven(c: Character) {
  return c.size === 3;
}

function hasEight(c: Character) {
  return c.size === 7;
}

function difference<T>(a: Set<T>, b: Set<T>) {
  return [...a].filter((x) => !b.has(x)).concat(
    [...b].filter((x) => !a.has(x)),
  );
}

function subtract<T>(a: Set<T>, b: Set<T>) {
  return [...a].filter((x) => !b.has(x));
}
