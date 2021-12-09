const weights: number[][] = (await Deno.readTextFile("./9-test-input.txt"))
  .split(
    "\n",
  ).map((s) => s.split("").map((s) => parseInt(s, 10)));

console.log(weights);
