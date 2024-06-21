import LinkedList from './LinkendList.mjs';

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
        this.#matrizAdyacencia[srcIndex].push(dest, weight);
        this.#matrizAdyacencia[destIndex].push(src, weight);
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

    dijkstra(startVertex, endVertex) {
        const infinit = 1000000000000000000000;
        const W = this.#matrizAdyacencia; // Matriz de adyacencia
        const numVertices = this.numVertices(); // Número de vértices en el grafo
        const D = Array(numVertices).fill(infinit); // Distancias
        const previous = {}; // Vértice previo en el camino min
        const L = new Set(); // Vértices visitados
        const LPrime = new Set(this.#map.keys()); // Vértices no visitados
        const startIndex = this.#map.get(startVertex);
        D[startIndex] = 0;
    
        while (L.size < numVertices) {
            // Encuentra el vértice en LPrime con la distancia mínima en D
            let minVertex = null;
            let minDist = infinit;
            for (let vertex of LPrime) {
                const vertexIndex = this.#map.get(vertex);
                if (D[vertexIndex] < minDist) {
                    minDist = D[vertexIndex];
                    minVertex = vertex;
                }
            }
    
            if (minVertex === null) {
                break; // No hay un vértice 
            }
    
            // Agrega el vértice mínimo a L y lo elimina de LPrime
            L.add(minVertex);
            LPrime.delete(minVertex);
    
            // Obtiene el índice del vértice actual
            const u = this.#map.get(minVertex);
    
            // Recorre los vecinos del vértice actual
            const neighbors = W[u]; // Obtenemos los vecinos 
            let current = neighbors.head;
            while (current) {
                const v = this.#map.get(current.value.node);
                const weight = current.value.weight;
                if (D[u] + weight < D[v]) {
                    D[v] = D[u] + weight;
                    previous[current.value.node] = minVertex;
                }
                current = current.next;
            }
        }
    
        // Reconstruir el camino más corto si se especifica un vértice final
        if (endVertex) {
            const endIndex = this.#map.get(endVertex);
            if (D[endIndex] === infinit) {
                return { path: [], distance: infinit };
            }
            const path = [];
            let step = endVertex;
            while (step) {
                path.push(step);
                step = previous[step];
            }
            return { path: path.reverse(), distance: D[endIndex] };
        }
    
        return { distances: D, previous: previous };
    }    

    numVertices() {
        return this.#map.size;
    }
}

export default Graph;
