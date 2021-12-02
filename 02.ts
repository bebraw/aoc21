const commands = (await Deno.readTextFile("./2-input.txt")).split("\n")
  .map((
    s,
  ) => ({
    command: s.split(" ")[0],
    amount: parseInt(s.split(" ")[1], 10),
  }));

let forwardPosition = 0;
let depth = 0;
let aim = 0;

commands.forEach(({ command, amount }) => {
  console.log(command, "before", { forwardPosition, depth, aim, amount });

  if (command === "forward") {
    forwardPosition += amount;
    depth += amount * aim;
  }
  if (command === "down") {
    aim += amount;
  }
  if (command === "up") {
    aim -= amount;
  }

  console.log(command, "after", { forwardPosition, depth, aim, amount });
});

const multiplied = forwardPosition * depth;

console.log(forwardPosition, depth, multiplied);
