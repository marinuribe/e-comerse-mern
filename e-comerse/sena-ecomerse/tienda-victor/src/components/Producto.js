import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../Store';

function Producto(props) {
  const { producto } = props;

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === producto._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/productos/${item._id}`);
    if (data.enInventario < quantity) {
      window.alert('Lo sentimos, por ahora este producto no esta en stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };

  return (
    <Card>
      <Link to={`/producto/${producto.ficha}`}>
        <img
          src={producto.imagen}
          className="card-img-top"
          alt={producto.nombre}
        />
      </Link>
      <Card.Body>
        <Link to={`/producto/${producto.ficha}`}>
          <Card.Title>{producto.nombre}</Card.Title>
        </Link>
        <Rating puntaje={producto.puntaje} reviews={producto.reviews} />
        <Card.Text>${producto.precio}</Card.Text>
        {producto.enInventario === 0 ? (
          <Button variant="ligt" disabled>
            Producto agotado
          </Button>
        ) : (
          <Button onClick={() => addToCartHandler(producto)}>
            Añadir al carrito
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default Producto;
