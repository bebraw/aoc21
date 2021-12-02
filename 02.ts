const commands = (await Deno.readTextFile("./2-input.txt")).split("\n")
  .map((
    s,
  ) => ({
    command: s.split(" ")[0],
    amount: parseInt(s.split(" ")[1], 10),
  }));

let forwardPosition = 0;
let depth = 0;

commands.forEach(({ command, amount }) => {
  if (command === "forward") {
    forwardPosition += amount;
  }
  if (command === "down") {
    depth += amount;
  }
  if (command === "up") {
    depth -= amount;
  }
});

const multiplied = forwardPosition * depth;

console.log(forwardPosition, depth, multiplied);
