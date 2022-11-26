import express from 'express';
import Producto from '../models/productModel.js';

const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
  const productos = await Producto.find();
  res.send(productos);
});

productRouter.get('/ficha/:ficha', async (req, res) => {
  const producto = await Producto.findOne({ ficha: req.params.ficha });
  if (producto) {
    res.send(producto);
  } else {
    res.status(404).send({ message: 'Producto no encontrado' });
  }
});
productRouter.get('/:id', async (req, res) => {
  const producto = await Producto.findById(req.params.id);
  if (producto) {
    res.send(producto);
  } else {
    res.status(404).send({ message: 'Producto no encontrado' });
  }
});

export default productRouter;
