import Graph from '../models/graph.mjs';

const graph = new Graph();

const btnAgregarDestino = document.getElementById("addVertexBtn");
const btnAgregarConexion = document.getElementById("addEdgeBtn");
const btnRecorridoProfundidad = document.getElementById("dfsBtn");
const btnRecorridoAnchura = document.getElementById("buttonAnchura");
const btnDijkstra = document.getElementById("dijkstraBtn");

const imprimirDFS = document.getElementById("dfsPathResult");
const imprimirBFS = document.getElementById("MostrarRecorridosAn");
const resultadoDijkstra = document.getElementById("dijkstraResult");

btnAgregarDestino.addEventListener("click", () => {
    const terminal = document.getElementById("vertex").value.trim();

    if (terminal === "") {
        alert('Ingrese un nombre válido para el punto de entrega');
        return;
    }

    if (graph.addVertex(terminal)) {
        alert('Punto de entrega añadido');
    } else {
        alert('El punto de entrega ya existe');
    }
});

btnAgregarConexion.addEventListener("click", () => {
    const terminal = document.getElementById("vertex1").value.trim();
    const destino = document.getElementById("vertex2").value.trim();
    const peso = parseInt(document.getElementById("weight").value);

    if (terminal === "" || destino === "" || isNaN(peso)) {
        alert('Ingrese valores válidos para la ruta');
        return;
    }

    if (graph.addEdge(terminal, destino, peso)) {
        alert('Ruta añadida');
    } else {
        alert('No se pudo agregar la ruta. Verifique que ambos puntos de entrega existan.');
    }
});

btnRecorridoProfundidad.addEventListener("click", () => {
    if (graph.numVertices() === 0) {
        alert('No hay rutas guardadas');
        return;
    }

    imprimirDFS.innerHTML = '';
    const startNode = document.getElementById("dfsStart").value.trim();

    if (startNode === "" || !graph.getVertices().includes(startNode)) {
        alert('Ingrese un punto de inicio válido para el recorrido');
        return;
    }

    graph.dfs(startNode, (vertex) => {
        let row = imprimirDFS.insertRow();
        let cell = row.insertCell(0);
        cell.innerHTML = vertex;
    });
});

btnRecorridoAnchura.addEventListener("click", () => {
    if (graph.numVertices() === 0) {
        alert('No hay rutas guardadas');
        return;
    }

    imprimirBFS.innerHTML = '';
    const startNode = document.getElementById("bfsStart").value.trim();

    if (startNode === "" || !graph.getVertices().includes(startNode)) {
        alert('Ingrese un punto de inicio válido para el recorrido');
        return;
    }

    graph.bfs(startNode, (vertex) => {
        let row = imprimirBFS.insertRow();
        let cell = row.insertCell(0);
        cell.innerHTML = vertex;
    });
});

btnDijkstra.addEventListener("click", () => {
    if (graph.numVertices() === 0) {
        alert('No hay rutas guardadas');
        return;
    }

    const startNode = document.getElementById("startNodeDijkstra").value.trim();
    const endNode = document.getElementById("endNodeDijkstra").value.trim();

    if (startNode === "" || endNode === "" || !graph.getVertices().includes(startNode) || !graph.getVertices().includes(endNode)) {
        alert('Ingrese puntos de inicio y destino válidos');
        return;
    }

    const { path, distance } = graph.dijkstra(startNode, endNode);

    resultadoDijkstra.innerHTML = '';

    if (path.length) {
        let row = resultadoDijkstra.insertRow();
        let cellPath = row.insertCell(0);
        let cellTotal = row.insertCell(1);
        cellPath.innerHTML = path.join(' -> ');
        cellTotal.innerHTML = distance; // Muestra la distancia total
    } else {
        let row = resultadoDijkstra.insertRow();
        let cell = row.insertCell(0);
        cell.colSpan = 2;
        cell.innerHTML = 'No se encontró un camino';
    }
});
