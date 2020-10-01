import React from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

const ThumbnailCarousel = ({ click }) => (

  <div className="image-arrow-wrapper">
    <Button variant="outline-dark" onClick={() => click('left')} type="button" className="image-left-arrow"><i className="fas fa-chevron-left" /></Button>
    <Button variant="outline-dark" onClick={() => click('right')} type="button" className="image-right-arrow"><i className="fas fa-chevron-right" /></Button>
  </div>

);

ThumbnailCarousel.propTypes = {
  click: PropTypes.func.isRequired,
};

export default ThumbnailCarousel;
