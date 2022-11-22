import { useParams } from 'react-router-dom';

function ProductScreen() {
  const params = useParams();
  const { ficha } = params;
  return (
    <div>
      <h1>{ficha}</h1>
    </div>
  );
}
export default ProductScreen;
