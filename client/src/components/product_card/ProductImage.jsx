import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Overlay from 'react-bootstrap/Overlay';
import Image from 'react-bootstrap/Image';
import ActionButton from './ActionButton';
import ComparisonTable from './ComparisonTable';

const ProductImage = ({ mainImage, productData, productCompare }) => {
  const [showOverlay, toggleOverlay] = useState(false);
  const target = useRef(null);

  const displayOverlay = () => {
    toggleOverlay(true);
  };
  const hideOverlay = () => {
    toggleOverlay(false);
  };

  return (

    <div className="product-image-container">

      <Image className="product-image" src={mainImage} alt={productData.name} />

      <div ref={target} onMouseEnter={displayOverlay} onMouseLeave={hideOverlay} className="card-button-container">
        <ActionButton cardType={productData.cardType} />
      </div>

      <Overlay target={target.current} show={showOverlay} placement="bottom">
        <div className="table-overlay">
          <ComparisonTable productData={productData} productCompare={productCompare} />
        </div>
      </Overlay>

    </div>
  );
};

ProductImage.propTypes = {

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

  productCompare: PropTypes.shape({
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

export default ProductImage;
