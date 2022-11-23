import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Rating from './Rating';

function Producto(props) {
  const { producto } = props;
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
        <Button>Añadir al carrito</Button>
      </Card.Body>
    </Card>
  );
}

export default Producto;
