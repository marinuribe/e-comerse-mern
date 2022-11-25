import express from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Conectado a la base de datos');
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();
//
app.get('/api/productos', (req, res) => {
  res.send(data.productos);
});
app.get('/api/productos/ficha/:ficha', (req, res) => {
  const producto = data.productos.find((x) => x.ficha === req.params.ficha);
  if (producto) {
    res.send(producto);
  } else {
    res.status(404).send({ message: 'Producto no encontrado' });
  }
});
app.get('/api/productos/:id', (req, res) => {
  const producto = data.productos.find((x) => x._id === req.params.id);
  if (producto) {
    res.send(producto);
  } else {
    res.status(404).send({ message: 'Producto no encontrado' });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
