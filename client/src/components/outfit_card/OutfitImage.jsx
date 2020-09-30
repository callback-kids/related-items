import React from 'react';
import PropTypes from 'prop-types';
import Image from 'react-bootstrap/Image';
import ActionButton from '../product_card/ActionButton';

const OutfitImage = ({ mainImage, productData }) => {

  return (
    <div className="product-image-container">
      <Image className="product-image" src={mainImage} alt={productData.name} />
      <div className="card-button-container">
        <ActionButton cardType={productData.cardType} />
      </div>
    </div>
  );
};

OutfitImage.propTypes = {

  mainImage: PropTypes.string.isRequired,

  productData: PropTypes.shape({
    cardType: PropTypes.string.isRequired,
    category: PropTypes.string,
    name: PropTypes.string.isRequired,
    price: PropTypes.number,
    features: PropTypes.arrayOf(PropTypes.shape({
      feature: PropTypes.string,
      value: PropTypes.string,
    })),
  }).isRequired,

};

export default OutfitImage;
