import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import ComparisonTable from './ComparisonTable';

const ProductImage = ({ mainImage, productData, productCompare }) => {
  const [showModal, toggleModal] = useState(false);
  const target = useRef(null);

  const displayModal = () => {
    toggleModal(true);
  };
  const hideModal = () => {
    toggleModal(false);
  };

  return (

    <div className="product-image-container">
      <Link to={`/products/${productData.id}`}>
        <Image className="product-image" src={mainImage} alt={productData.name} />
      </Link>
      <div ref={target} className="card-button-container">
        <Button onClick={displayModal} variant="secondary" className="card-button" type="button"><i className="fas fa-star" /></Button>
      </div>

      <Modal dialogClassName="table-modal" size="md" className="table-modal" show={showModal} onHide={hideModal}>
        <div className="table-overlay">
          <ComparisonTable productData={productData} productCompare={productCompare} />
        </div>
      </Modal>

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
    id: PropTypes.number,
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
    id: PropTypes.number,
    features: PropTypes.arrayOf(PropTypes.shape({
      feature: PropTypes.string,
      value: PropTypes.string,
    })),
  }).isRequired,

};

export default ProductImage;
