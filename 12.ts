import { assert } from "https://deno.land/std@0.117.0/testing/asserts.ts";

type Node = { from: "start" | string; to: "end" | string };
type GraphNode = { id: string; to: string; isBig: boolean };

const nodes: Node[] = (await Deno.readTextFile("./12-test-input.txt"))
  .split(
    "\n",
  ).map((s) => ({ from: s.split("-")[0], to: s.split("-")[1] }));
const graph = nodesToGraph(nodes);

console.log(graph, calculateAmountOfPaths(graph));

assert(calculateAmountOfPaths(graph) === 10);

/*
start,A,b,A,c,A,end
start,A,b,A,end
start,A,b,end
start,A,c,A,b,A,end
start,A,c,A,b,end
start,A,c,A,end
start,A,end
start,b,A,c,A,end
start,b,A,end
start,b,end
*/

function nodesToGraph(nodes: Node[]) {
  const foundNodes: Record<string, GraphNode[]> = {};

  nodes.forEach(({ from, to }) => {
    const fromObject: GraphNode = {
      id: from,
      to,
      isBig: from === from.toUpperCase(),
    };

    if (foundNodes[from]) {
      foundNodes[from].push(fromObject);

      const toObject = { id: to, to: from, isBig: to === to.toUpperCase() };

      if (foundNodes[to]) {
        foundNodes[to].push(toObject);
      } else {
        foundNodes[to] = [toObject];
      }
    } else {
      foundNodes[from] = [fromObject];
    }
  });

  return foundNodes;
}

function calculateAmountOfPaths(graph: Record<string, GraphNode[]>) {
  let amount = 0;

  Object.entries(graph).forEach(([id, nodes]) => {
    nodes.forEach(({ to }) => {
      const target = graph[to];

      if (target) {
        // console.log("target", target);

        // TODO: Recursion over what remains?
        // amount += calculateAmountOfPaths()
      }

      // TODO: Handle to + isBig (allows return)
    });
  });

  return amount;
}
