// Inicia o express e define a variavel do servidor.
const express = require("express");
const server = express();
const routes = require("./routes");

// Template Engine
server.set('view engine', 'ejs');

// Habilita os assets
server.use(express.static("public"));

// Arquivo de Rotas
server.use(routes);

// Inicia o servidor na porta especificada.
server.listen(3000, () => console.log("Servidor iniciado"));