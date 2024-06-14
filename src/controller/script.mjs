import Graph from '../models/graph.mjs';

const graph = new Graph();

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('addVertexBtn').addEventListener('click', addVertex);
    document.getElementById('addEdgeBtn').addEventListener('click', addEdge);
    document.getElementById('findPathBtn').addEventListener('click', findShortestPath);
});

export function addVertex() {
    const vertex = document.getElementById('vertex').value;
    if (vertex) {
        graph.addVertex(vertex);
        alert('Punto de entrega añadido');
    } else {
        alert('Ingrese un nombre válido para el punto de entrega');
    }
}

export function addEdge() {
    const vertex1 = document.getElementById('vertex1').value;
    const vertex2 = document.getElementById('vertex2').value;
    const weight = parseFloat(document.getElementById('weight').value);
    try {
        if (vertex1 && vertex2 && !isNaN(weight)) {
            graph.addEdge(vertex1, vertex2, weight);
            alert('Ruta añadida');
        } else {
            alert('Ingrese valores válidos para la ruta');
        }
    } catch (error) {
        alert(error.message);
    }
}

export function findShortestPath() {
    const startNode = document.getElementById('startNode').value;
    const endNode = document.getElementById('endNode').value;
    if (startNode && endNode) {
        const path = graph.dijkstra(startNode, endNode);
        if (path.length) {
            const distance = calculateTotalDistance(path);
            document.getElementById('pathResult').innerText = path.join(' -> ');
            document.getElementById('distanceResult').innerText = distance;
        } else {
            alert('No se encontró una ruta entre los puntos especificados');
        }
    } else {
        alert('Ingrese puntos de inicio y destino válidos');
    }
}

function calculateTotalDistance(path) {
    let totalDistance = 0;
    for (let i = 0; i < path.length - 1; i++) {
        const vertex1 = path[i];
        const vertex2 = path[i + 1];
        const edge = graph.edges[vertex1].find(e => e.node === vertex2);
        totalDistance += edge.weight;
    }
    return totalDistance;
}
