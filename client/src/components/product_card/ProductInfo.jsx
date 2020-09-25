import React from 'react';
import PropTypes from 'prop-types';

const ProductInfo = ({ data }) => (

  <div className="product-info">

    <div className="title-text">
      Category:
      <span className="product-category">{` ${data.category}`}</span>
    </div>
    <div className="product-name">{data.name}</div>
    <div className="product-price">{`$${data.price}`}</div>

  </div>

);

ProductInfo.propTypes = {

  data: PropTypes.shape({
    category: PropTypes.string,
    name: PropTypes.string.isRequired,
    price: PropTypes.number,
  }).isRequired,

};

export default ProductInfo;
