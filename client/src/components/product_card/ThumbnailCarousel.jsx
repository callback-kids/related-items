import React from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

const ThumbnailCarousel = ({ click }) => (
  <div>
    <div className="image-arrow-wrapper">
      <Button variant="outline-dark" onClick={() => click('left')} type="button" className="image-left-arrow">{'<'}</Button>
      <Button variant="outline-dark" onClick={() => click('right')} type="button" className="image-right-arrow">{'>'}</Button>
    </div>
  </div>
);

ThumbnailCarousel.propTypes = {
  click: PropTypes.func.isRequired,
};

export default ThumbnailCarousel;
