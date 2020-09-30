import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import ProductInfo from '../product_card/ProductInfo';
import OutfitImage from './OutfitImage';
import ThumbnailCarousel from '../product_card/ThumbnailCarousel';

const OutfitCard = ({ data, reviews, images, remove }) => {
  const [hover, changeHover] = useState(false);
  const [mainImageIndex, changeMainImageIndex] = useState(0);
  // flips state of hover on mouse enter/exit
  const hideArrows = () => {
    changeHover(false);
  };
  const showArrows = () => {
    changeHover(true);
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

    <div onMouseEnter={showArrows} onMouseLeave={hideArrows} className="product-card-wrapper">
      <Card className="product-card">
        <OutfitImage
          mainImage={images[mainImageIndex]}
          productData={data}
          remove={remove}
        />
        {hover ? <ThumbnailCarousel click={handleArrowClick} /> : ''}
        <ProductInfo data={data} reviews={reviews} />
      </Card>
    </div>

  );
};

OutfitCard.propTypes = {

  data: PropTypes.shape({
    cardType: PropTypes.string.isRequired,
    category: PropTypes.string,
    name: PropTypes.string.isRequired,
    price: PropTypes.number,
    features: PropTypes.arrayOf(PropTypes.shape({
      feature: PropTypes.string,
      value: PropTypes.string,
    })),
  }).isRequired,

  reviews: PropTypes.shape({
    stars: PropTypes.number,
  }).isRequired,

  images: PropTypes.arrayOf(PropTypes.string).isRequired,

  remove: PropTypes.func.isRequired,

};

export default OutfitCard;
