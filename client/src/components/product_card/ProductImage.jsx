import React from 'react';
import PropTypes from 'prop-types';
import Image from 'react-bootstrap/Image';

const ProductImage = ({ images, productName }) => (

  <Image className="product-image" src={images[2]} alt={productName} />

);

ProductImage.propTypes = {

  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  productName: PropTypes.string.isRequired,

};

export default ProductImage;
