const segments: { begin: Set<string>[]; end: Set<string>[] }[] =
  (await Deno.readTextFile("./8-test-input.txt"))
    .split(
      "\n",
    ).map(parseSegment);

console.log(segments);

function parseSegment(s: string) {
  const [begin, end] = s.split("|");

  return {
    begin: begin.trim().split(" ").map((s) => new Set(s.split(""))),
    end: end.trim().split(" ").map((s) => new Set(s.split(""))),
  };
}
