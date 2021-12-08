import { permutations } from "https://deno.land/std@0.103.0/collections/permutations.ts";

type Character = Set<string>;
type Segments = { begin: Character[]; end: Character[] };

const segments: Segments[] = (await Deno.readTextFile("./8-test-input.txt"))
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
  // TODO: Encode shapes directly here
  const shapes = [
    zeroShape,
    oneShape,
    twoShape,
    threeShape,
    fourShape,
    fiveShape,
    sixShape,
    sevenShape,
    eightShape,
    nineShape,
  ].map((s) => s());

  const matches = alternatives.map((alternative) => {
    const matched = words.begin.concat(words.end).every((word) => {
      const mapping = Object.fromEntries(
        characters.map((c, i) => [c, alternative[i]]),
      );
      const mappedWord = Array.from(word).map((w) => mapping[w]);

      // TODO: Pick already chosen shapes and avoid using them again
      return shapes.some(({ shape }) =>
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

      return shapes.find(({ shape }) =>
        intersection(shape, new Set(mappedWord)).size === mappedWord.length
      )
        ?.char;
    });

    console.log(m);
    /*
    const word = words[0];
    const wordMapping = Object.fromEntries(
      characters.map((c, i) => [c, match[i]]),
    );
    const mappedWord = Array.from(word).map((w) => wordMapping[w]);
    const matchingShape = shapes.find(({ shape }) =>
      difference(shape, new Set(mappedWord))
    );

    console.log("got match", match);
    */

    // console.log(match, word, mappedWord, matchingShape);
  } else {
    throw new Error("No match");
  }

  // const alternative = new Set(alternatives[0]);
  // console.log(shapes.some((shape) => difference(shape, alternative)));

  // See if an alternative satisfies a segment
}

function zeroShape() {
  return { char: 0, shape: new Set(["a", "b", "c", "e", "f", "g"]) };
}

function oneShape() {
  return { char: 1, shape: new Set(["c", "f"]) };
}

function twoShape() {
  return { char: 2, shape: new Set(["a", "c", "d", "e", "g"]) };
}

function threeShape() {
  return { char: 3, shape: new Set(["a", "c", "d", "f", "g"]) };
}

function fourShape() {
  return { char: 4, shape: new Set(["b", "c", "d", "f"]) };
}

function fiveShape() {
  return { char: 5, shape: new Set(["a", "b", "d", "f", "g"]) };
}

function sixShape() {
  return { char: 6, shape: new Set(["a", "b", "d", "e", "f", "g"]) };
}

function sevenShape() {
  return { char: 7, shape: new Set(["a", "c", "f"]) };
}

function eightShape() {
  return { char: 8, shape: new Set(["a", "b", "c", "d", "e", "f", "g"]) };
}

function nineShape() {
  return { char: 9, shape: new Set(["a", "b", "c", "d", "f", "g"]) };
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
