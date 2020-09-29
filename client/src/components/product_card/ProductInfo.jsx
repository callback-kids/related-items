import React from 'react';
import PropTypes from 'prop-types';
import StarRating from './StarRating';

const ProductInfo = ({ data, reviews, starSize }) => (

  <div className="product-info">

    <div className="title-text">

      <span className="product-category">{` ${data.category}`}</span>
    </div>
    <div className="product-name">{data.name}</div>
    <div className="product-price-rating">
      <span className="product-price">{`$${data.price}`}</span>
      <span className="star-wrapper">
        <StarRating rating={reviews.stars} starSize={starSize} />
      </span>
    </div>
  </div>

);

ProductInfo.propTypes = {

  data: PropTypes.shape({
    cardType: PropTypes.string.isRequired,
    category: PropTypes.string,
    name: PropTypes.string.isRequired,
    price: PropTypes.number,
  }).isRequired,

  reviews: PropTypes.shape({
    stars: PropTypes.number,
  }).isRequired,

  starSize: PropTypes.number.isRequired,

};

export default ProductInfo;
