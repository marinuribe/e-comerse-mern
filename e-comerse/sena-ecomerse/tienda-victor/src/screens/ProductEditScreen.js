import React, { useContext, useEffect, useReducer, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Store } from '../Store';
import { getError } from './utils';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Button from 'react-bootstrap/Button';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default function ProductEditScreen() {
  const params = useParams(); // /product/:id
  const { id: productId } = params;

  const { state } = useContext(Store);
  const { userInfo } = state;
  const [{ loading, error }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  const [nombre, setName] = useState('');
  const [ficha, setSlug] = useState('');
  const [precio, setPrice] = useState('');
  const [imagen, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [enInventario, setCountInStock] = useState('');
  const [marca, setBrand] = useState('');
  const [descripcion, setDescription] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/productos/${productId}`);
        setName(data.nombre);
        setSlug(data.ficha);
        setPrice(data.precio);
        setImage(data.imagen);
        setCategory(data.category);
        setCountInStock(data.enInventario);
        setBrand(data.marca);
        setDescription(data.descripcion);
        dispatch({ type: 'FETCH_SUCCESS' });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, [productId]);

  return (
    <Container className="small-container">
      <Helmet>
        <title>Editar producto ${productId}</title>
      </Helmet>
      <h1>Editar producto {productId}</h1>

      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <Form>
          <Form.Group className="mb-3" controlId="nombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              value={nombre}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="ficha">
            <Form.Label>Ficha</Form.Label>
            <Form.Control
              value={ficha}
              onChange={(e) => setSlug(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="nombre">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              value={precio}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="imagen">
            <Form.Label>Archivo de imagen</Form.Label>
            <Form.Control
              value={imagen}
              onChange={(e) => setImage(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="category">
            <Form.Label>Categoria</Form.Label>
            <Form.Control
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="marca">
            <Form.Label>Marca</Form.Label>
            <Form.Control
              value={marca}
              onChange={(e) => setBrand(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="enInventario">
            <Form.Label>En inventario</Form.Label>
            <Form.Control
              value={enInventario}
              onChange={(e) => setCountInStock(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="descripcion">
            <Form.Label>Descripcion</Form.Label>
            <Form.Control
              value={descripcion}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>
          <div className="mb-3">
            <Button type="submit">Actualizar</Button>
          </div>
        </Form>
      )}
    </Container>
  );
}