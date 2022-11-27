import express from 'express';
import Producto from '../models/productModel.js';
import data from '../data.js';
import User from '../models/userModel.js'

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  await Producto.remove({});
  const createdProducts = await Producto.insertMany(data.productos);
  await User.remove({});
  const createdUsers = await User.insertMany(data.usuarios);
  res.send({ createdProducts, createdUsers });
});
export default seedRouter;

