const express = require("express");
const app = express();
//llamo mis rutas
const apiRutas = require("./rutas/index");

const PORT = 8080;

app.use(`/api`, apiRutas);

const server = app.listen(PORT, () => {
  console.log(`server ${PORT}`);
});

server.on("error", (err) => console.error(err));
