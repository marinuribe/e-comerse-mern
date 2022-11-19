import data from './data';

function App() {
  return (
    <div>
      <header>
        <a href="/">Tienda de Victor</a>
      </header>
      <main>
        <h1>Productos destacados</h1>
        <div className="productos">
          {data.productos.map((producto) => (
            <div className="producto" key={producto.ficha}>
              <a href={`/producto/${producto.ficha}`}>
                <img src={producto.imagen} alt={producto.nombre} />
              </a>
              <div className="producto-info">
                <a href={`/producto/${producto.ficha}`}>
                  <p>{producto.nombre}</p>
                </a>
                <p>
                  <strong>${producto.precio} COP</strong>
                </p>
                <button>Añadir al carrito</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
