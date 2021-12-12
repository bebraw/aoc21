import { assert } from "https://deno.land/std@0.117.0/testing/asserts.ts";

type Node = { from: "start" | string; to: "end" | string };
type GraphNode = { id: string; to: string };

const nodes: Node[] = (await Deno.readTextFile("./12-test-input.txt"))
  .split(
    "\n",
  ).map((s) => ({ from: s.split("-")[0], to: s.split("-")[1] }));
const graph = nodesToGraph(nodes);

console.log("graph", graph);
console.log("paths", calculatePaths(graph));

// assert(calculateAmountOfPaths(graph) === 10);

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
    };

    if (foundNodes[from]) {
      foundNodes[from].push(fromObject);

      const toObject: GraphNode = {
        id: to,
        to: from,
      };

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

function calculatePaths(
  graph: Record<string, GraphNode[]>,
  id?: string,
  visitedNodes?: string[],
) {
  if (!graph.start) {
    throw new Error("Missing start nodes");
  }

  if (id === "end") {
    return visitedNodes;
  }

  if (!id) {
    id = "start";
  }

  let ret: string[] = [id];

  graph[id]?.forEach((child) => {
    if (child.id == "end") {
      return;
    }

    const visitedNodeId = visitedNodes?.find((id) => child.id === id);

    // TODO: How to handle branching here - duplicate path so far somehow?
    if (
      !visitedNodeId ||
      (visitedNodeId.toUpperCase() === visitedNodeId) && child.to !== "start"
    ) {
      const paths = calculatePaths(
        graph,
        child.to,
        ret.concat(child.to),
      );

      if (paths) {
        ret = ret.concat(paths);
      }
    }
  });

  return ret;
}
