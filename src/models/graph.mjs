class Graph {
    constructor() {
        this.vertices = [];
        this.edges = {};
    }

    addVertex(vertex) {
        if (!this.edges[vertex]) {
            this.vertices.push(vertex);
            this.edges[vertex] = [];
        }
    }

    addEdge(vertex1, vertex2, weight) {
        if (this.edges[vertex1] && this.edges[vertex2]) {
            this.edges[vertex1].push({ node: vertex2, weight: weight });
            this.edges[vertex2].push({ node: vertex1, weight: weight });
        } else {
            throw new Error('Uno o ambos vértices no existen.');
        }
    }

    dijkstra(startNode, endNode) {
        let distances = {};
        let visited = {};
        let previous = {};
        let queue = [];

        this.vertices.forEach(vertex => {
            distances[vertex] = Infinity;
            visited[vertex] = false;
            previous[vertex] = null;
        });

        distances[startNode] = 0;
        queue.push({ node: startNode, distance: 0 });

        while (queue.length) {
            let { node } = queue.sort((a, b) => a.distance - b.distance).shift();
            if (node === endNode) {
                let path = [];
                while (previous[node]) {
                    path.push(node);
                    node = previous[node];
                }
                return path.concat(startNode).reverse();
            }
            if (!visited[node]) {
                visited[node] = true;
                this.edges[node].forEach(neighbor => {
                    let newDistance = distances[node] + neighbor.weight;
                    if (newDistance < distances[neighbor.node]) {
                        distances[neighbor.node] = newDistance;
                        previous[neighbor.node] = node;
                        queue.push({ node: neighbor.node, distance: newDistance });
                    }
                });
            }
        }
        return [];
    }
}

export default Graph;
