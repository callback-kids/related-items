import React from 'react';
import PropTypes from 'prop-types';

const ProductImage = ({ images, productName }) => (
  <div>
    <img src={images[0]} alt={productName} />
  </div>
);

ProductImage.propTypes = {

  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  productName: PropTypes.string.isRequired,

};

export default ProductImage;
