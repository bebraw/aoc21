import { assert } from "https://deno.land/std@0.117.0/testing/asserts.ts";

const lines: string[] = (await Deno.readTextFile("./10-input.txt"))
  .split("\n");

// Valid cases
assert(isValid("()").ok);
assert(isValid("[]").ok);
assert(isValid("{}").ok);
assert(isValid("<>").ok);
assert(isValid("([])").ok);
assert(isValid("{()()()}").ok);
assert(isValid("<([{}])>").ok);
assert(isValid("[<>({}){}[([])<>]]").ok);
assert(isValid("(((((((((())))))))))").ok);

// Corrupted cases
assert(!isValid("(]").ok);
assert(!isValid("{()()()>").ok);
assert(!isValid("(((()))}").ok);
assert(!isValid("<([]){()}[{}])").ok);

const validLines = lines.filter((l) => isValid(l).ok);
const invalidLines = lines.map((l) => isValid(l)).filter((o) => !o.ok).map(
  (o) => o.failedAt,
);

console.log(
  "all lines",
  lines.length,
  "valid lines",
  validLines.length,
  "invalid lines",
  invalidLines,
  "fail score",
  scoreFails(invalidLines),
);

function isValid(line: string) {
  const startingPairs: string[] = [];
  const expectedCharacters: string[] = [];

  const characters = line.split("");
  for (let i = 0; i < characters.length; i++) {
    const c = characters[i];

    if (["(", "[", "{", "<"].includes(c)) {
      startingPairs.push(c);

      switch (c) {
        case "(":
          expectedCharacters.push(")");
          break;
        case "[":
          expectedCharacters.push("]");
          break;
        case "{":
          expectedCharacters.push("}");
          break;
        case "<":
          expectedCharacters.push(">");
          break;
        default:
          break;
      }
    } else if (expectedCharacters[expectedCharacters.length - 1] === c) {
      expectedCharacters.pop();
    } else {
      return {
        ok: false,
        failedAt: c,
      };
    }
  }

  return { ok: true, failedAt: "" };
}

function scoreFails(fails: string[]) {
  const scores: Record<string, number> = {
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137,
  };

  return fails.map((c) => scores[c] ? scores[c] : 0).reduce(
    (a, b) => a + b,
    0,
  );
}
