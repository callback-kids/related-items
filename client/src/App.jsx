import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Outfit from './components/Outfit';
import RelatedProducts from './components/RelatedProducts';
import * as controller from './routes/apicontroller';

const data = {
  cardType: 'related',
  category: 'Shoes',
  name: 'blue suede',
  price: 50,
};

const reviews = {
  stars: 3.5,
};

const images = [
  'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
  'https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80',
  'https://images.unsplash.com/photo-1549831243-a69a0b3d39e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2775&q=80',
  'https://images.unsplash.com/photo-1527522883525-97119bfce82d?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
];

const card = { data, reviews, images };

const cards = [card, card, card, card, card, card, card, card, card];

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      relatedItems: cards,
    };
  }
  // retrieves and formats data for one product card

  // gets array of related product id's, gets info for each product id
  // and creates array entry for each related product

  componentDidMount() {
    console.log('getting new items');
    // this.getAllProductInfo(1)
    //   .then((cardsArray) => {
    //     this.setState({
    //       relatedItems: cardsArray,
    //     });
    //   })
    //   .catch((err) => console.log(err));
  }

  getOneProductInfo(id) {
    const itemInfo = {};
    return controller.getItemInfo(id)
      .then((info) => {
        itemInfo.data = info;
        return controller.getItemPhotos(id);
      })
      .then((photos) => {
        itemInfo.images = photos;
        return controller.getStars(id);
      })
      .then((stars) => {
        itemInfo.reviews = stars;
        return itemInfo;
      })
      .catch((err) => { throw err; });
  }

  getAllProductInfo(id) {
    return controller.getRelatedItemsList(id)
    // get list of related product id's
      .then((relatedItemsList) => {
        this.createProductCardArray(relatedItemsList);
        return Promise.all(relatedItemsList)
          .then((cardsArray) => cardsArray);
      })
      .catch((err) => { throw err; });
  }

  createProductCardArray(productList) {
    const returnArray = [];
    for (let i = 0; i < productList.length; i + 1) {
      returnArray.push(this.getOneProductInfo(productList[i]));
    }
    return returnArray;
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
            <RelatedProducts products={this.state.relatedItems} />
          </Col>
          <Col xs={1} sm={2} />
        </Row>
        <Row className="carousel-rows">
          <Col xs={0} sm={2} />
          <Col xs={12} sm={8}>
            <Outfit />
          </Col>
          <Col xs={0} sm={2} />
        </Row>
      </Container>
    );
  }
}

export default App;
