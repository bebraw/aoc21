const lights: number[][] = (await Deno.readTextFile("./11-test-input.txt"))
  .split(
    "\n",
  ).map((s) => s.split("").map((n) => parseInt(n, 10)));

console.log(lights);
