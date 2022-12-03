function Puntaje(props) {
  const { puntaje, numReviews, caption } = props;
  return (
    <div className="puntaje">
      <span>
        <i
          className={
            puntaje >= 1
              ? 'fas fa-star'
              : puntaje >= 0.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        />
      </span>
      <span>
        <i
          className={
            puntaje >= 2
              ? 'fas fa-star'
              : puntaje >= 1.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        />
      </span>
      <span>
        <i
          className={
            puntaje >= 3
              ? 'fas fa-star'
              : puntaje >= 2.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        />
      </span>
      <span>
        <i
          className={
            puntaje >= 4
              ? 'fas fa-star'
              : puntaje >= 3.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        />
      </span>
      <span>
        <i
          className={
            puntaje >= 5
              ? 'fas fa-star'
              : puntaje >= 4.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        />
      </span>
      {caption ? (
        <span>{caption}</span>
      ) : (
        <span>{' ' + numReviews + ' Reseñas'}</span>
      )}
    </div>
  );
}
export default Puntaje;
