import { useEffect, useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import logger from 'use-reducer-logger';
/* import data from '../data'; */

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, productos: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomeScreen() {
  const [{ loading, error, productos }, dispatch] = useReducer(
    logger(reducer),
    {
      productos: [],
      loading: true,
      error: '',
    }
  );
  // const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/productos');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }

      // setProducts(result.data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1>Productos destacados</h1>
      <div className="productos">
        {loading ? (
          <div>Cargando...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          productos.map((producto) => (
            <div className="producto" key={producto.ficha}>
              <Link to={`/producto/${producto.ficha}`}>
                <img src={producto.imagen} alt={producto.nombre} />
              </Link>
              <div className="producto-info">
                <Link to={`/producto/${producto.ficha}`}>
                  <p>{producto.nombre}</p>
                </Link>
                <p>
                  <strong>${producto.precio} COP</strong>
                </p>
                <button>Añadir al carrito</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default HomeScreen;
