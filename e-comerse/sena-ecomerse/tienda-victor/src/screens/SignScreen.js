import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation } from 'react-router-dom';

export default function SignScreen() {
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('direct');
  const redirect = redirectInUrl ? redirectInUrl : '/';
  return (
    <Container className="small-container">
      <Helmet>
        <title>Iniciar sección</title>
      </Helmet>
      <h1 className="my-3">Iniciar sección</h1>
      <Form>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Correo</Form.Label>
          <Form.Control type="email" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type="password" required />
        </Form.Group>
        <div className="mb-3">
          <Button type="submit">Ingresar</Button>
        </div>
        <div className="mb-3">
          Eres nuevo y no tienes cuenta?{' '}
          <Link to={`/signup?redirect=${redirect}`}>
            Aquí puedes crear tu cuenta
          </Link>
        </div>
      </Form>
    </Container>
  );
}
