import React from 'react';
import PropTypes from 'prop-types';

const ProductCard = ({ data, reviews }) => (
  <div>

    <div className="product-category">{data.category}</div>
    <div className="product-name">{data.name}</div>
    <div className="product-price">{`$${data.price}`}</div>

  </div>
);

ProductCard.propTypes = {
  data: {
    category: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
  },
  reviews: {
    stars: PropTypes.number,
  },
};

ProductCard.defaultProps = {
  data: PropTypes.object,
  reviews: PropTypes.object,
};

export default ProductCard;
