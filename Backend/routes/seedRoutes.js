import express from 'express';
import Producto from '../models/productModel.js';
import data from '../data.js';

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  await Producto.remove({});
  const createdProducts = await Producto.insertMany(data.productos);
  res.send({ createdProducts });
});
export default seedRouter;
