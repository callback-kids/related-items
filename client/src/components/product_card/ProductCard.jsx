import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import ProductInfo from './ProductInfo';
import ProductImage from './ProductImage';

const ProductCard = ({ data, reviews, images }) => (

  <Card className="product-card">
    <ProductImage images={images} productName={data.name} />
    <ProductInfo data={data} reviews={reviews} />
  </Card>

);

ProductCard.propTypes = {

  data: PropTypes.shape({
    category: PropTypes.string,
    name: PropTypes.string.isRequired,
    price: PropTypes.number,
  }).isRequired,

  reviews: PropTypes.shape({
    stars: PropTypes.number,
  }).isRequired,

  images: PropTypes.arrayOf(PropTypes.string).isRequired,

};

export default ProductCard;
