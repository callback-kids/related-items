import React from 'react';
import PropTypes from 'prop-types';

const ThumbnailCarousel = ({ images }) => (
  <div>
    <div className="image-arrow-wrapper">
      <button type="button" className="image-left-arrow">{'<'}</button>
      <button type="button" className="image-right-arrow">{'>'}</button>
    </div>
  </div>
);

ThumbnailCarousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ThumbnailCarousel;
