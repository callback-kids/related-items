import React from 'react';
import PropTypes from 'prop-types';
import StarRating from './StarRating';

const ProductInfo = ({ data, reviews }) => (

  <div className="product-info">

    <div className="title-text">

      <span className="product-category">{` ${data.category}`}</span>
    </div>
    <div className="product-name">{data.name}</div>
    <div className="product-price-rating">
      <span className="product-price">{`$${data.price}`}</span>
      <span className="star-wrapper">
        <StarRating rating={reviews.stars} />
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
    id: PropTypes.number,
  }).isRequired,

  reviews: PropTypes.shape({
    stars: PropTypes.number,
  }).isRequired,

};

export default ProductInfo;
