import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import ProductInfo from './ProductInfo';
import ProductImage from './ProductImage';
import ThumbnailCarousel from './ThumbnailCarousel';

const ProductCard = ({ data, reviews, images, starSize }) => {
  const [hover, changeHover] = useState(false);
  const [mainImageIndex, changeMainImageIndex] = useState(0);
  // flips state of hover on mouse enter/exit
  const hoverHandler = () => {
    changeHover(!hover);
  };

  // used to change the card image on left or right arrow click
  const handleArrowClick = (arrowDirection) => {
    if (arrowDirection === 'left') {
      // if first image, go to the last image
      if (mainImageIndex === 0) {
        changeMainImageIndex(images.length - 1);
      } else {
        changeMainImageIndex(mainImageIndex - 1);
      }
    } else if (arrowDirection === 'right') {
      // if last image, go to the first image
      if (mainImageIndex === images.length - 1) {
        changeMainImageIndex(0);
      } else {
        changeMainImageIndex(mainImageIndex + 1);
      }
    }
  };

  return (

    <div onMouseEnter={hoverHandler} onMouseLeave={hoverHandler} className="product-card-wrapper">
      <Card className="product-card">
        <ProductImage mainImage={images[mainImageIndex]} productData={data} />
        {hover ? <ThumbnailCarousel click={handleArrowClick} /> : ''}
        <ProductInfo data={data} reviews={reviews} starSize={starSize} />
      </Card>
    </div>

  );
};

ProductCard.propTypes = {

  data: PropTypes.shape({
    cardType: PropTypes.string.isRequired,
    category: PropTypes.string,
    name: PropTypes.string.isRequired,
    price: PropTypes.number,
  }).isRequired,

  reviews: PropTypes.shape({
    stars: PropTypes.number,
  }).isRequired,

  images: PropTypes.arrayOf(PropTypes.string).isRequired,

  starSize: PropTypes.number.isRequired,

};

export default ProductCard;
