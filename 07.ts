const locations: number[] = (await Deno.readTextFile("./7-test-input.txt"))
  .split(
    ",",
  ).map((s) => parseInt(s, 10));

console.log(locations);
