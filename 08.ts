type Character = Set<string>;
type Segments = { begin: Character[]; end: Character[] };

const segments: Segments[] = (await Deno.readTextFile("./8-test-input-2.txt"))
  .split(
    "\n",
  ).map(parseSegment);

console.log(evaluateAllSegments(segments));

function parseSegment(s: string) {
  const [begin, end] = s.split("|");

  return {
    begin: begin.trim().split(" ").map((s) => new Set(s.split(""))),
    end: end.trim().split(" ").map((s) => new Set(s.split(""))),
  };
}

function evaluateAllSegments(segments: Segments[]) {
  return segments.map(evaluateSegments).reduce((a, b) => a + b, 0);
}

function evaluateSegments(segments: Segments) {
  const finalSegments: Record<string, string> = {};
  const foundNumbers: Record<string, Character> = {};
  const zeroSixOrNine: Character[] = [];
  const twoThreeOrFive: Character[] = [];
  let foundNumberAmount = 0;

  segments.begin.forEach((segment) => {
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
    if (hasTwoThreeOrFive(segment)) {
      twoThreeOrFive.push(segment);
    }
    if (hasZeroSixOrNine(segment)) {
      zeroSixOrNine.push(segment);
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

  console.log(
    "final segments",
    finalSegments,
    "zero, six or nine",
    zeroSixOrNine,
    "two, three or five",
    twoThreeOrFive,
  );

  return foundNumberAmount;
}

function hasOne(c: Character) {
  return c.size === 2;
}

function hasFour(c: Character) {
  return c.size === 4;
}

function hasTwoThreeOrFive(c: Character) {
  return c.size === 5;
}

function hasZeroSixOrNine(c: Character) {
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
