import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Outfit from './components/Outfit';
import RelatedProducts from './components/RelatedProducts';
import * as controller from './routes/apicontroller';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      featuredProductData: {},
      relatedItems: [],
      outfit: [],
    };
  }

  componentDidMount() {
    // check if page is refreshing to product page
    if (this.props.match.params.id) {
      this.getAppData(parseInt(this.props.match.params.id));
    } else {
      // default product
      this.getAppData(1);
    }
  }

  componentDidUpdate(prevProps) {
    // update id state and cause rerender with new products if passed a new id url param
    if (this.props.match.params !== prevProps.match.params) {
      if (this.props.match.params.id) {
        this.getAppData(parseInt(this.props.match.params.id));
      }
    }
  }

  getAppData(id) {
    controller.getAllProductInfo(id, 'related')
      .then((cardsArray) => {
        this.setState({
          relatedItems: cardsArray,
        });
        // get info for main product, used in comparison table
        return controller.getOneProductInfo(id, 'outfit');
      })
      // gets info for featured product
      .then((productData) => {
        this.setState({
          featuredProductData: productData,
        });
      })
      .catch((err) => { throw err; });

    // if outfit in local storage, set outfit state, otherwise do nothing
    if (localStorage.savedOutfit) {
      this.setState({
        outfit: JSON.parse(localStorage.savedOutfit),
      });
    }
  }

  render() {
    return (
      <div>

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

      </div>
    );
  }
}

export default App;
