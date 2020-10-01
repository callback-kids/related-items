import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Outfit from './components/Outfit';
import RelatedProducts from './components/RelatedProducts';
import * as controller from './routes/apicontroller';

const data = {
  cardType: 'outfit',
  category: 'Shoes',
  name: 'blue suede',
  price: 50,
};

const reviews = {
  stars: 3.5,
};

const images = {
  thumbnails: [
    'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
    'https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80',
    'https://images.unsplash.com/photo-1549831243-a69a0b3d39e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2775&q=80',
    'https://images.unsplash.com/photo-1527522883525-97119bfce82d?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80'],
};

const card = { data, reviews, images };

const cards = [];

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      featuredProductData: {},
      relatedItems: [],
      outfit: [],
    };
  }

  componentDidMount() {
    // gets info for related products
    controller.getAllProductInfo(55, 'related')
      .then((cardsArray) => {
        this.setState({
          relatedItems: cardsArray,
        });
        // get info for main product, used in comparison table
        return controller.getOneProductInfo(5, 'outfit');
      })
      // gets info for featured product
      .then((productData) => {
        this.setState({
          featuredProductData: productData,
        });
      })
      .catch((err) => console.log(err));

    // if outfit in local storage, set outfit state, otherwise do nothing
    if (localStorage.savedOutfit) {
      this.setState({
        outfit: JSON.parse(localStorage.savedOutfit),
      });
    }
  }

  render() {
    return (
      <Container className="container" fluid>
        <Row>
          <Col xs={1} sm={2} />
          <Col xs={10} sm={8}>
            <div className="carousel-title">People Also Liked</div>
          </Col>
          <Col xs={1} sm={2} />
        </Row>
        <Row className="carousel-rows">
          <Col xs={1} sm={2} />
          <Col xs={10} sm={8}>
            <RelatedProducts
              products={this.state.relatedItems}
              productCompare={this.state.featuredProductData.data}
            />
          </Col>
          <Col xs={1} sm={2} />
        </Row>
        <Row>
          <Col xs={1} sm={2} />
          <Col xs={10} sm={8}>
            <div className="carousel-title">Your Outfit</div>
          </Col>
          <Col xs={1} sm={2} />
        </Row>
        <Row className="carousel-rows">
          <Col xs={1} sm={2} />
          <Col xs={10} sm={8}>
            <Outfit
              outfit={this.state.outfit}
              currentItem={this.state.featuredProductData}
            />
          </Col>
          <Col xs={1} sm={2} />
        </Row>
        <Row>
          <Col xs={0} sm={2} />
          <Col xs={12} sm={8} />
          <Col xs={0} sm={2} />
        </Row>
      </Container>
    );
  }
}

export default App;
