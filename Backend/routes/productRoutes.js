import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Producto from '../models/productModel.js';
import { isAuth, empleado } from '../utils.js';

const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
  const productos = await Producto.find();
  res.send(productos);
});

productRouter.post(
  '/',
  isAuth,
  empleado,
  expressAsyncHandler(async (req, res) => {
    const newProduct = new Producto({
      nombre: 'Escriba nombre del producto' + Date.now(),
      ficha: '' + Date.now(),
      imagen: '/images/p1.jpg',
      precio: 0,
      category: 'Escriba la categoria',
      marca: 'Escribala marca',
      enInventario: 0,
      puntaje: 0,
      reviews: 0,
      descripcion: 'Breve descripción',
    });
    const producto = await newProduct.save();
    res.send({ message: 'Producto creado', producto });
  })
);

const PAGE_SIZE = 3;

productRouter.get(
  '/admin',
  isAuth,
  empleado,
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const page = query.page || 1;
    const pageSize = query.pageSize || PAGE_SIZE;

    const productos = await Producto.find()
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    const countProducts = await Producto.countDocuments();
    res.send({
      productos,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
    });
  })
);

productRouter.get(
  '/search',
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const pageSize = query.pageSize || PAGE_SIZE;
    const page = query.page || 1;
    const category = query.category || '';
    const precio = query.precio || '';
    const puntaje = query.puntaje || '';
    const order = query.order || '';
    const searchQuery = query.query || '';

    const queryFilter =
      searchQuery && searchQuery !== 'all'
        ? {
            nombre: {
              $regex: searchQuery,
              $options: 'i',
            },
          }
        : {};
    const categoryFilter = category && category !== 'all' ? { category } : {};
    const ratingFilter =
      rating && rating !== 'all'
        ? {
            rating: {
              $gte: Number(rating),
            },
          }
        : {};
    const priceFilter =
      precio && precio !== 'all'
        ? {
            // 1-50
            precio: {
              $gte: Number(precio.split('-')[0]),
              $lte: Number(precio.split('-')[1]),
            },
          }
        : {};
    const sortOrder =
      order === 'featured'
        ? { featured: -1 }
        : order === 'lowest'
        ? { precio: 1 }
        : order === 'highest'
        ? { precio: -1 }
        : order === 'toprated'
        ? { puntaje: -1 }
        : order === 'newest'
        ? { createdAt: -1 }
        : { _id: -1 };

    const productos = await Producto.find({
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    })
      .sort(sortOrder)
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    const countProducts = await Producto.countDocuments({
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    });
    res.send({
      productos,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
    });
  })
);

productRouter.get(
  '/categories',
  expressAsyncHandler(async (req, res) => {
    const categories = await Producto.find().distinct('category');
    res.send(categories);
  })
);

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