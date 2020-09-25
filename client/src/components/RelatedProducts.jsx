import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import ProductCard from './product_card/ProductCard';

const RelatedProducts = ({ products }) => {
  const [currentCardIndex, changeCardIndex] = useState(0);

  const goRight = () => {

  };

  const goLeft = () => {

  };

  return (
    <div>
      <div className="cards-slider">
        <div className="cards-slider-wrapper" style={{}}>
          {products.map((value) => (
            <ProductCard data={value.data} reviews={value.reviews} images={value.images} />
          ))}
        </div>
      </div>
      <Button className="arrow-button left-button" type="button">{'<-'}</Button>
      <Button className="arrow-button right-button" type="button">{'->'}</Button>
    </div>
  );
};

RelatedProducts.propTypes = {

  products: PropTypes.arrayOf(PropTypes.object).isRequired,

};

export default RelatedProducts;
