// Inicia o express e define a variavel do servidor.
const express = require("express");
const server = express();

// Request e response
server.get("/", (request, response) => {
    return response.send('');
});

// Inicia o servidor na porta especificada.
server.listen(3000, () => console.log("Servidor iniciado"));