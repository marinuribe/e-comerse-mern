import { Link } from "react-router-dom";
import data from "../data";

function HomeScreen() {
  return <div>
    <h1>Productos destacados</h1>
          <div className="productos">
            {data.productos.map((producto) => (
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
            ))}
          </div>
  </div>;
}

export default HomeScreen;
