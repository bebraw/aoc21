import { assert } from "https://deno.land/std@0.117.0/testing/asserts.ts";

const lines: string[] = (await Deno.readTextFile("./10-test-input.txt"))
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
const invalidLines = lines.map((l) => isValid(l)).filter((o) => !o.ok);
const invalidLinesFailedAt = lines.map((l) => isValid(l)).filter((o) => !o.ok)
  .map(
    (o) => o.failedAt,
  );
const incompleteLines = lines.filter((l) => isValid(l).incomplete);

console.log(
  "all lines",
  lines.length,
  "valid lines",
  validLines.length,
  "invalid lines",
  invalidLines,
  "fail score",
  scoreFails(invalidLinesFailedAt),
  "incomplete lines",
  incompleteLines,
);

assert(
  !isValid(fixIncompleteLine("[({(<(())[]>[[{[]{<()<>>").value).incomplete,
);
assert(!isValid(fixIncompleteLine("[(()[<>])]({[<{<<[]>>(").value).incomplete);
assert(!isValid(fixIncompleteLine("(((({<>}<{<{<>}{[]{[]{}").value).incomplete);
assert(!isValid(fixIncompleteLine("{<[[]]>}<{[{[{[]{()[[[]").value).incomplete);
assert(
  !isValid(fixIncompleteLine("<{([{{}}[<[[[<>{}]]]>[]]").value).incomplete,
);

function fixIncompleteLine(input: string) {
  const stats = isValid(input);

  if (stats.incomplete) {
    // reverse() is dangerous as it mutates
    const fix = stats.expectedCharacters.reverse().join("");

    return { value: input + fix, score: scoreFix(fix) };
  }

  return { value: input };
}

assert(scoreFix("}}]])})]") === 288957);
assert(scoreFix(")}>]})") === 5566);
assert(scoreFix("}}>}>))))") === 1480781);
assert(scoreFix("]]}}]}]}>") === 995444);
assert(scoreFix("])}>") === 294);

function scoreFix(s: string) {
  const scores: Record<string, number> = { ")": 1, "]": 2, "}": 3, ">": 4 };

  return s.split("").reduce((a, b) => 5 * a + scores[b], 0);
}

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

  if (expectedCharacters.length > 0) {
    return { ok: true, failedAt: "", incomplete: true, expectedCharacters };
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
