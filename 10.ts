import { assert } from "https://deno.land/std@0.117.0/testing/asserts.ts";

const lines: string[] = (await Deno.readTextFile("./10-test-input.txt"))
  .split("\n");

// Valid cases
assert(isValid("()"));
assert(isValid("[]"));
assert(isValid("{}"));
assert(isValid("<>"));
assert(isValid("([])"));
assert(isValid("{()()()}"));
assert(isValid("<([{}])>"));
assert(isValid("[<>({}){}[([])<>]]"));
assert(isValid("(((((((((())))))))))"));

// Corrupted cases
assert(!isValid("(]"));
assert(!isValid("{()()()>"));
assert(!isValid("(((()))}"));
assert(!isValid("<([]){()}[{}])"));

console.log(isValid(lines[0]));

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
    } else if (expectedCharacters.includes(c)) {
      expectedCharacters.pop();
    } else {
      return false;
    }
  }

  return true;
}
