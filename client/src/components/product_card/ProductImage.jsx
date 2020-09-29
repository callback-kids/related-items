import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Overlay from 'react-bootstrap/Overlay';
import Image from 'react-bootstrap/Image';
import ActionButton from './ActionButton';
import ComparisonTable from './ComparisonTable';

const ProductImage = ({ mainImage, productData }) => {
  const [showOverlay, toggleOverlay] = useState(false);
  const target = useRef(null);

  const overlayHandler = () => {
    toggleOverlay(!showOverlay);
  };

  return (
    <div className="product-image-container">
      <Image className="product-image" src={mainImage} alt={productData.name} />
      <div ref={target} onMouseEnter={overlayHandler} onMouseLeave={overlayHandler} className="card-button-container">
        <ActionButton cardType={productData.cardType} />
      </div>
      <Overlay target={target.current} show={showOverlay} placement="bottom">
        <div className="table-overlay">
          <ComparisonTable />
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
  }).isRequired,

};

export default ProductImage;
