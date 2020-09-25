import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Outfit from './components/Outfit';
import RelatedProducts from './components/RelatedProducts';

const App = () => (

  <div>
    <Container fluid>
      <Row>
        <Col xs={0} sm={2} />
        <Col xs={12} sm={8} className="test">Test Middle Column</Col>
        <Col xs={0} sm={2} />
      </Row>
    </Container>
    <RelatedProducts />
    <Outfit />
  </div>

);

export default App;
