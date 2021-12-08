type Character = Set<string>;
type Segments = { begin: Character[]; end: Character[] };

const segments: Segments[] = (await Deno.readTextFile("./8-test-input.txt"))
  .split(
    "\n",
  ).map(parseSegment);

// console.log(segments);
console.log(evaluateAllSegments(segments));

function parseSegment(s: string) {
  const [begin, end] = s.split("|");

  return {
    begin: begin.trim().split(" ").map((s) => new Set(s.split(""))),
    end: end.trim().split(" ").map((s) => new Set(s.split(""))),
  };
}

function evaluateAllSegments(allSegments: Segments[]) {
  allSegments.forEach(evaluateSegments);
}

function evaluateSegments(segments: Segments) {
  const finalSegments: Record<string, string> = {};
  const foundNumbers: Record<string, Character> = {};
  const sixOrNine: Character[] = [];

  segments.begin.forEach((segment) => {
    if (hasOne(segment)) {
      foundNumbers[1] = segment;
    }
    if (hasFour(segment)) {
      foundNumbers[4] = segment;
    }
    if (hasSeven(segment)) {
      foundNumbers[7] = segment;
    }
    if (hasEight(segment)) {
      foundNumbers[8] = segment;
    }
    if (hasSixOrNine(segment)) {
      sixOrNine.push(segment);
    }
  });

  if (foundNumbers[1] && foundNumbers[7]) {
    const top = difference(foundNumbers[1], foundNumbers[7])[0];

    finalSegments[top] = "a";
  }

  // TODO: If 5 and 6 are found, then e can be figured out
  // TODO: If 8 and 9 are found, then e can be figured out
  // TODO: Check six and nine
  console.log(foundNumbers, finalSegments, sixOrNine);

  return "foobar";
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
