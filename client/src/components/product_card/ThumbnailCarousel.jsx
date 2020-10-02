import React from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

const ThumbnailCarousel = ({ click }) => (

  <div className="image-arrow-wrapper">

    <Button onClick={() => click('left')} type="button" className="thumbnail-arrow image-left-arrow"><i className="fas fa-chevron-left" /></Button>

    <Button onClick={() => click('right')} type="button" className="thumbnail-arrow image-right-arrow"><i className="fas fa-chevron-right" /></Button>

  </div>

);

ThumbnailCarousel.propTypes = {
  click: PropTypes.func.isRequired,
};

export default ThumbnailCarousel;
