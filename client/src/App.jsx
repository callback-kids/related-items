import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Outfit from './components/Outfit';
import RelatedProducts from './components/RelatedProducts';
import ProductCard from './components/product_card/ProductCard';

const data = {
  category: 'Shoes',
  name: 'blue suede',
  price: 50,
};

const reviews = {
  stars: 3,
};

const images = [
  'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
  'https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80',
  'https://images.unsplash.com/photo-1549831243-a69a0b3d39e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2775&q=80',
  'https://images.unsplash.com/photo-1527522883525-97119bfce82d?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
];

const App = () => (

  <div>
    <Container fluid>
      <Row>
        <Col xs={0} sm={2}>
          <ProductCard data={data} reviews={reviews} images={images} />
        </Col>
        <Col xs={12} sm={8} />
        <Col xs={0} sm={2} />
      </Row>
    </Container>
    <RelatedProducts />
    <Outfit />
  </div>

);

export default App;
