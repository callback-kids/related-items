import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import ProductCard from './product_card/ProductCard';

const RelatedProducts = ({ products }) => {
  const [currentCardIndex, changeCardIndex] = useState(0);
  const [cardsLength, updateCardsLength] = useState(products.length - 1);

  const goRight = () => {
    if (currentCardIndex < cardsLength) {
      changeCardIndex(currentCardIndex + 1);
    }
  };

  const goLeft = () => {
    if (currentCardIndex > 0) {
      changeCardIndex(currentCardIndex - 1);
    }
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
      {currentCardIndex > 0 ? <Button className="arrow-button left-button" type="button">{'<-'}</Button> : ''}
      {currentCardIndex < cardsLength ? <Button className="arrow-button right-button" type="button">{'->'}</Button> : ''}
    </div>
  );
};

RelatedProducts.propTypes = {

  products: PropTypes.arrayOf(PropTypes.object).isRequired,

};

export default RelatedProducts;
