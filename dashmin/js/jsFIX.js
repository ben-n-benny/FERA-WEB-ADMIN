class Graph {
  constructor() {
    this.nodes = new Map();
  }

  addNode(node) {
    this.nodes.set(node, []);
  }

  addEdge(node1, node2, weight) {
    this.nodes.get(node1).push({ node: node2, weight });
    this.nodes.get(node2).push({ node: node1, weight });
  }

  dijkstra(startNode, endNode) {
    let distances = new Map();
    let previous = new Map();
    let unvisited = new Set();

    for (let [node] of this.nodes) {
      distances.set(node, Infinity);
      previous.set(node, null);
      unvisited.add(node);
    }

    distances.set(startNode, 0);

    while (unvisited.size > 0) {
      let currentNode = null;
      let currentDistance = Infinity;

      for (let [node, distance] of distances) {
        if (unvisited.has(node) && distance < currentDistance) {
          currentNode = node;
          currentDistance = distance;
        }
      }

      unvisited.delete(currentNode);

      for (let neighbor of this.nodes.get(currentNode)) {
        let distance = distances.get(currentNode) + neighbor.weight;

        if (distance < distances.get(neighbor.node)) {
          distances.set(neighbor.node, distance);
          previous.set(neighbor.node, currentNode);
        }
      }
    }

    let path = [];
    let current = endNode;

    while (current !== null) {
      path.unshift(current);
      current = previous.get(current);
    }

    return path;
  }
}

var graph = new Graph();

// graph.addNode("A");
// graph.addNode("B");
// graph.addNode("C");
// graph.addNode("B");
// graph.addNode("C");
// graph.addNode("D");
// graph.addNode("C");
// graph.addNode("D");
// graph.addNode("A");
// graph.addNode("C");
// graph.addNode("B");
// graph.addNode("D");

// graph.addEdge("A","B",1)
// graph.addEdge("B","C",2)
// graph.addEdge("C","D",1)
// graph.addEdge("A","C",4)
// graph.addEdge("B","D",5)

var items = [
  ["A", "B", 1],
  ["B", "C", 2],
  ["C", "D", 1],
  ["A", "C", 4],
  ["B", "D", 5],
];

items.forEach((item) => {
  graph.addNode(item[0]);
  graph.addNode(item[1]);
});
items.forEach((item) => {
  graph.addEdge(item[0], item[1], item[2]);
});
console.log(graph.nodes);
console.log(graph.dijkstra("A", "D"));
