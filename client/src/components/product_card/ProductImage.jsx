import React from 'react';
import PropTypes from 'prop-types';
import Image from 'react-bootstrap/Image';
import ActionButton from './ActionButton';

const ProductImage = ({ mainImage, productData }) => (

  <div className="product-image-container">
    <Image className="product-image" src={mainImage} alt={productData.name} />
    <div className="card-button-container">
      <ActionButton cardType={productData.cardType} />
    </div>
  </div>

);

ProductImage.propTypes = {

  mainImage: PropTypes.string.isRequired,

  productData: PropTypes.shape({
    cardType: PropTypes.string.isRequired,
    category: PropTypes.string,
    name: PropTypes.string.isRequired,
    price: PropTypes.number,
  }).isRequired,

};

export default ProductImage;
