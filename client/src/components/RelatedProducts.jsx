import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import ProductCard from './product_card/ProductCard';

const RelatedProducts = ({ products }) => {
  const [currentCardIndex, changeCardIndex] = useState(0);
  // subracting 3 since you want to display a total of 3-4 images no matter what
  const [scrollLength] = useState(products.length - 3);

  const goRight = () => {
    if (currentCardIndex < scrollLength) {
      changeCardIndex(currentCardIndex + 1);
    }
  };

  const goLeft = () => {
    if (currentCardIndex > 0) {
      changeCardIndex(currentCardIndex - 1);
    }
  };

  return (
    <div className="carousel-container">
      <div className="cards-slider">
        <div
          className="cards-slider-wrapper"
          style={{
            // moves carousel to the left relative to the container
            transform: `translateX(-${14.5 * currentCardIndex}vw)`,
          }}
        >
          {products.map((value) => (
            <ProductCard data={value.data} reviews={value.reviews} images={value.images} />
          ))}
        </div>
      </div>
      {currentCardIndex > 0 ? <Button onClick={goLeft} className="arrow-button left-button" type="button">{'<'}</Button> : ''}
      {currentCardIndex < scrollLength ? <Button onClick={goRight} className="arrow-button right-button" type="button">{'>'}</Button> : ''}
    </div>
  );
};

RelatedProducts.propTypes = {

  products: PropTypes.arrayOf(PropTypes.object).isRequired,

};

export default RelatedProducts;
