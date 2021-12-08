import { permutations } from "https://deno.land/std@0.103.0/collections/permutations.ts";

type Character = Set<string>;
type Segments = { begin: Character[]; end: Character[] };

const segments: Segments[] = (await Deno.readTextFile("./8-test-input-2.txt"))
  .split(
    "\n",
  ).map(parseSegment);

evaluateAllSegments(segments);

function parseSegment(s: string) {
  const [begin, end] = s.split("|");

  return {
    begin: begin.trim().split(" ").map((s) => new Set(s.split(""))),
    end: end.trim().split(" ").map((s) => new Set(s.split(""))),
  };
}

function evaluateAllSegments(segments: Segments[]) {
  return segments.forEach(evaluateSegments);
}

function evaluateSegments(words: Segments) {
  // Possible mappings from a character to another based on index
  const characters = ["a", "b", "c", "d", "e", "f", "g"];
  const alternatives = permutations(characters);
  const shapes = [
    { char: 0, shape: new Set(["a", "b", "c", "e", "f", "g"]) },
    { char: 1, shape: new Set(["c", "f"]) },
    { char: 2, shape: new Set(["a", "c", "d", "e", "g"]) },
    { char: 3, shape: new Set(["a", "c", "d", "f", "g"]) },
    { char: 4, shape: new Set(["b", "c", "d", "f"]) },
    { char: 5, shape: new Set(["a", "b", "d", "f", "g"]) },
    { char: 6, shape: new Set(["a", "b", "d", "e", "f", "g"]) },
    { char: 7, shape: new Set(["a", "c", "f"]) },
    { char: 8, shape: new Set(["a", "b", "c", "d", "e", "f", "g"]) },
    { char: 9, shape: new Set(["a", "b", "c", "d", "f", "g"]) },
  ];

  const matches = alternatives.map((alternative) => {
    const matched = words.begin.concat(words.end).every((word) => {
      const mapping = Object.fromEntries(
        characters.map((c, i) => [c, alternative[i]]),
      );
      const mappedWord = Array.from(word).map((w) => mapping[w]);

      return shapes.some(({ shape }) =>
        shape.size === mappedWord.length &&
        intersection(shape, new Set(mappedWord)).size ===
          mappedWord.length
      );
    });

    if (matched) {
      return alternative;
    }
  }).filter(Boolean);
  const match = matches.length > 0 ? matches[0] : [];

  if (match) {
    const m = words.end.map((word) => {
      const wordMapping = Object.fromEntries(
        characters.map((c, i) => [c, match[i]]),
      );
      const mappedWord = Array.from(word).map((w) => wordMapping[w]);

      return {
        word,
        number: shapes.find(({ shape }) =>
          intersection(shape, new Set(mappedWord)).size === mappedWord.length
        )
          ?.char,
      };
    });

    console.log(m);
  } else {
    throw new Error("No match");
  }
}

function difference<T>(a: Set<T>, b: Set<T>) {
  return [...a].filter((x) => !b.has(x)).concat(
    [...b].filter((x) => !a.has(x)),
  );
}

function subtract<T>(a: Set<T>, b: Set<T>) {
  return [...a].filter((x) => !b.has(x));
}

function intersection<T>(setA: Set<T>, setB: Set<T>) {
  const _intersection = new Set();

  for (const elem of setB) {
    if (setA.has(elem)) {
      _intersection.add(elem);
    }
  }
  return _intersection;
}
