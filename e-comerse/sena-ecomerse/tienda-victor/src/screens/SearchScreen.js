import React, { useEffect, useReducer, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getError } from './utils';
import { Helmet } from 'react-helmet-async';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Rating from '../components/Rating';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Button from 'react-bootstrap/Button';
import Product from '../components/Producto';
import LinkContainer from 'react-router-bootstrap/LinkContainer';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        products: action.payload.productos,
        page: action.payload.page,
        pages: action.payload.pages,
        countProducts: action.payload.countProducts,
        loading: false,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

const prices = [
  {
    nombre: '$1 to $50',
    value: '1-50',
  },
  {
    nombre: '$51 to $200',
    value: '51-200',
  },
  {
    nombre: '$201 to $1000',
    value: '201-1000',
  },
];

export const ratings = [
  {
    nombre: '4stars & up',
    rating: 4,
  },

  {
    nombre: '3stars & up',
    rating: 3,
  },

  {
    nombre: '2stars & up',
    rating: 2,
  },

  {
    nombre: '1stars & up',
    rating: 1,
  },
];

export default function SearchScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search); // /search?category=Shirts
  const category = sp.get('category') || 'all';
  const query = sp.get('query') || 'all';
  const precio = sp.get('precio') || 'all';
  const puntaje = sp.get('puntaje') || 'all';
  const order = sp.get('order') || 'newest';
  const page = sp.get('page') || 1;

  const [{ loading, error, productos, pages, countProducts }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `/api/productos/search?page=${page}&query=${query}&category=${category}&precio=${precio}&puntaje=${puntaje}&order=${order}`
        );
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(error),
        });
      }
    };
    fetchData();
  }, [category, error, order, page, precio, query, puntaje]);

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/productos/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, [dispatch]);

  const getFilterUrl = (filter) => {
    const filterPage = filter.page || page;
    const filtercategory = filter.category || category;
    const filterQuery = filter.query || query;
    const filterRating = filter.puntaje || puntaje;
    const filterPrice = filter.precio || precio;
    const sortOrder = filter.order || order;
    return `/search?category=${filtercategory}&query=${filterQuery}&precio=${filterPrice}&puntaje=${filterRating}&order=${sortOrder}&page=${filterPage}`;
  };
  return (
    <div>
      <Helmet>
        <title>Buscar productos</title>
      </Helmet>
      <Row>
        <Col md={3}>
          <h3>Tipo</h3>
          <div>
            <ul>
              <li>
                <Link
                  className={'all' === category ? 'text-bold' : ''}
                  to={getFilterUrl({ category: 'all' })}
                >
                  Todos
                </Link>
              </li>
              {categories.map((c) => (
                <li key={c}>
                  <Link
                    className={c === category ? 'text-bold' : ''}
                    to={getFilterUrl({ category: c })}
                  >
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Precio</h3>
            <ul>
              <li>
                <Link
                  className={'all' === precio ? 'text-bold' : ''}
                  to={getFilterUrl({ precio: 'all' })}
                >
                  Todos
                </Link>
              </li>
              {prices.map((p) => (
                <li key={p.value}>
                  <Link
                    to={getFilterUrl({ precio: p.value })}
                    className={p.value === precio ? 'text-bold' : ''}
                  >
                    {p.nombre}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Avg. Customer Review</h3>
            <ul>
              {ratings.map((r) => (
                <li key={r.nombre}>
                  <Link
                    to={getFilterUrl({ puntaje: r.puntaje })}
                    className={`${r.puntaje}` === `${puntaje}` ? 'text-bold' : ''}
                  >
                    <Rating caption={' & up'} puntaje={r.puntaje}></Rating>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to={getFilterUrl({ puntaje: 'all' })}
                  className={puntaje === 'all' ? 'text-bold' : ''}
                >
                  <Rating caption={' & up'} puntaje={0}></Rating>
                </Link>
              </li>
            </ul>
          </div>
        </Col>
        <Col md={9}>
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              <Row className="justify-content-between mb-3">
                <Col md={6}>
                  <div>
                    {countProducts === 0 ? 'No' : countProducts} Results
                    {query !== 'all' && ' : ' + query}
                    {category !== 'all' && ' : ' + category}
                    {precio !== 'all' && ' : Price ' + precio}
                    {puntaje !== 'all' && ' : Rating ' + puntaje + ' & up'}
                    {query !== 'all' ||
                    category !== 'all' ||
                    puntaje !== 'all' ||
                    precio !== 'all' ? (
                      <Button
                        variant="light"
                        onClick={() => navigate('/search')}
                      >
                        <i className="fas fa-times-circle"></i>
                      </Button>
                    ) : null}
                  </div>
                </Col>
                <Col className="text-end">
                  Sort by{' '}
                  <select
                    value={order}
                    onChange={(e) => {
                      navigate(getFilterUrl({ order: e.target.value }));
                    }}
                  >
                    <option value="newest">Productos nuevos</option>
                    <option value="lowest">Precio: de menor a mayor</option>
                    <option value="highest">Precio: de mayor a menor</option>
                    <option value="toprated">Comentarios de clientes</option>
                  </select>
                </Col>
              </Row>
              {productos.length === 0 && (
                <MessageBox>Producto no encontrado</MessageBox>
              )}

              <Row>
                {productos.map((producto) => (
                  <Col sm={6} lg={4} className="mb-3" key={producto._id}>
                    <Product producto={producto}></Product>
                  </Col>
                ))}
              </Row>

              <div>
                {[...Array(pages).keys()].map((x) => (
                  <LinkContainer
                    key={x + 1}
                    className="mx-1"
                    to={getFilterUrl({ page: x + 1 })}
                  >
                    <Button
                      className={Number(page) === x + 1 ? 'text-bold' : ''}
                      variant="light"
                    >
                      {x + 1}
                    </Button>
                  </LinkContainer>
                ))}
              </div>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
}