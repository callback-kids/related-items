import React from 'react';
import PropTypes from 'prop-types';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import ActionButton from '../product_card/ActionButton';

const OutfitImage = ({ mainImage, productData, remove }) => {

  return (
    <div className="product-image-container">
      <Image className="product-image" src={mainImage} alt={productData.name} />
      <div className="card-button-container">
        <Button variant="secondary" className="card-button" type="button" onClick={() => remove(productData.id)} cardType={productData.cardType}
        >✖</Button>
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
    id: PropTypes.number,
    features: PropTypes.arrayOf(PropTypes.shape({
      feature: PropTypes.string,
      value: PropTypes.string,
    })),
  }).isRequired,

  remove: PropTypes.func.isRequired,

};

export default OutfitImage;
