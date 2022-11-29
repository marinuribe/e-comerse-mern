import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function CheckoutSteps(props) {
  return (
    <Row className="checkout-steps">
      <Col className={props.step1 ? 'active' : ''}>Inicio</Col>
      <Col className={props.step2 ? 'active' : ''}>Tus datos</Col>
      <Col className={props.step3 ? 'active' : ''}>Pago</Col>
      <Col className={props.step4 ? 'active' : ''}>Detalle venta</Col>
    </Row>
  );
}