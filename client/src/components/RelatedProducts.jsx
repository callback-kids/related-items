import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import ProductCard from './product_card/ProductCard';

const RelatedProducts = ({ products }) => {
  const [currentCardIndex, changeCardIndex] = useState(0);
  // subracting 3 since you want to display a total of 3-4 images no matter what
  const [scrollLength, updateScrollLength] = useState('');
  const [offset, updateOffset] = useState(0);

  useEffect(() => {
    updateScrollLength(products.length - 3);
    // need to wait for a product card to mount
    setTimeout(() => {
      const cardWidth = document.querySelector('.product-card-wrapper');
      const totalWidth = cardWidth.offsetWidth;
      // 20 is the right margin between cards
      updateOffset(totalWidth + 20);
    }, 0.1);
  }, [products]);

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
            transform: `translateX(-${offset * currentCardIndex}px)`,
          }}
        >
          {products.map((value) => (
            <ProductCard
              data={value.data}
              images={value.images.thumbnails}
              reviews={value.reviews}
              starSize={offset}
            />
          ))}
        </div>
      </div>
      {currentCardIndex > 0 ? <Button onClick={goLeft} className="arrow-button left-button" type="button">⇦</Button> : ''}
      {currentCardIndex < scrollLength ? <Button onClick={goRight} className="arrow-button right-button" type="button">⇨</Button> : ''}
    </div>
  );
};

RelatedProducts.propTypes = {

  products: PropTypes.arrayOf(PropTypes.object).isRequired,

};

export default RelatedProducts;
