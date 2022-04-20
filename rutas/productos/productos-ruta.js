const express = require("express");
const { productosLista } = require("../../data/index");
const router = express.Router();

router.get(`/productos`, (req, res) => {
  res.send(productosLista);
});

router.get(`/productos/:id`, (req, res) => {
  const { id } = req.params;

  if (id) {
    let dataId = productosLista.find((e) => e.id === id);

    return !dataId
      ? res.status(400).send({ msj: "Error Producto no encontrado" })
      : res.send(dataId);
  }
});

router.post("/productos", (req, res) => {
  const { title, description, img, price, stock } = req.body;

  const findId = productosLista.map((item) => item.id);
  let newId;
  if (findId.length == 0) newId = 1;
  else newId = Math.max.apply(null, findId) + 1;

  const nuevoProducto = {
    id: newId,
    title: title,
    description: description,
    img: img,
    price: price,

    stock: stock,
  };

  productosLista.push(nuevoProducto);
  res.status(200).send(`producto cargado`);
});

router.put(`/productos/:id`, (req, res) => {
  const {
    params: { id },
    body: { title, price, img, stock },
  } = req;

  if (!id) {
    res.status(404).send(`No encontrado`);
  }

  const productoIndex = productosLista.findIndex((e) => e.id === +id);

  if (!productoIndex)
    return res
      .status(404)
      .send({ success: false, error: `Producto no encontrado` });
  const nuevoProducto = {
    ...productosLista[productoIndex],
    title,
    price,
    img,
    stock,
  };
  productosLista[productoIndex] = nuevoProducto;
  return res.json({ success: true, result: nuevoProducto });
});

router.delete("/productos/:id", (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(404).send("Id not found");

  const productoId = productosLista.findIndex((e) => e.id === id);

  productosLista.splice(productoId, 1);

  return res.status(200).send("Id eliminado correctamente");
});

module.exports = router;
