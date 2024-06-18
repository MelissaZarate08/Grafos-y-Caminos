class Graph {
    #map;
    #matrizAdyacencia;

    constructor() {
        this.#map = new Map();
        this.#matrizAdyacencia = [];
    }


    addVertex(vertex) {
        if (this.#map.has(vertex)) {
            return false;
        }
        this.#map.set(vertex, this.#matrizAdyacencia.length);
        this.#matrizAdyacencia.push(new LinkedList());
        return true;
    }

    getVertices() {
        return Array.from(this.#map.keys());
    }

    addEdge(src, dest, weight) {
        if (!this.#map.has(src) || !this.#map.has(dest)) {
            return false;
        }
        const srcIndex = this.#map.get(src);
        const destIndex = this.#map.get(dest);
        this.#matrizAdyacencia[srcIndex].addNode({ node: dest, weight: weight });
        this.#matrizAdyacencia[destIndex].addNode({ node: src, weight: weight });
        return true;
    }

    dfs(startNode, visitFn) {
        const stack = [startNode];
        const visited = new Set();
        while (stack.length) {
            const node = stack.pop();
            if (!visited.has(node)) {
                visitFn(node);
                visited.add(node);
                const neighbors = this.#matrizAdyacencia[this.#map.get(node)].getNodes();
                for (const neighbor of neighbors) {
                    if (!visited.has(neighbor.node)) {
                        stack.push(neighbor.node);
                    }
                }
            }
        }
    }

    bfs(startNode, visitFn) {
        const queue = [startNode];
        const visited = new Set();
        while (queue.length) {
            const node = queue.shift();
            if (!visited.has(node)) {
                visitFn(node);
                visited.add(node);
                const neighbors = this.#matrizAdyacencia[this.#map.get(node)].getNodes();
                for (const neighbor of neighbors) {
                    if (!visited.has(neighbor.node)) {
                        queue.push(neighbor.node);
                    }
                }
            }
        }
    }

    dijkstra(startNode, endNode) {
        let distances = {};
        let visited = {};
        let previous = {};
        let queue = [];

        for (let vertex of this.#map.keys()) {
            distances[vertex] = Infinity;
            visited[vertex] = false;
            previous[vertex] = null;
        }

        distances[startNode] = 0;
        queue.push({ node: startNode, distance: 0 });

        while (queue.length) {
            let { node } = queue.sort((a, b) => a.distance - b.distance).shift();
            if (node === endNode) {
                let path = [];
                let totalDistance = distances[node];
                while (previous[node]) {
                    path.push(node);
                    node = previous[node];
                }
                return { path: path.concat(startNode).reverse(), distance: totalDistance };
            }
            if (!visited[node]) {
                visited[node] = true;
                const neighborsLinkedList = this.#matrizAdyacencia[this.#map.get(node)];
                let current = neighborsLinkedList.head;
                while (current) {
                    let neighbor = current.value.node;
                    let weight = current.value.weight;
                    let newDistance = distances[node] + weight;
                    if (newDistance < distances[neighbor]) {
                        distances[neighbor] = newDistance;
                        previous[neighbor] = node;
                        queue.push({ node: neighbor, distance: newDistance });
                    }
                    current = current.next;
                }
            }
        }
        return { path: [], distance: 0 };
    }

    numVertices() {
        return this.#map.size;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    addNode(value) {
        const newNode = { value, next: null };
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
    }

    getNodes() {
        let nodes = [];
        let current = this.head;
        while (current) {
            nodes.push(current.value);
            current = current.next;
        }
        return nodes;
    }
}

export default Graph;
