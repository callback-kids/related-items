import React, { useState, useEffect } from 'react';
import ReactStars from 'react-rating-stars-component';
import PropTypes from 'prop-types';

const StarRating = ({ rating, starSize }) => {
  const [size, updateSize] = useState(15);

  useEffect(() => {
    // conditionally renders star size based on productcard width
    updateSize(starSize === 200 ? 15 : 20);
  }, [starSize]);

  return (
    <ReactStars
      count={5}
      size={size}
      isHalf
      edit={false}
      value={rating}
      activeColor="#F5B895"
    />
  );
};

StarRating.propTypes = {

  rating: PropTypes.number.isRequired,

  starSize: PropTypes.number.isRequired,

};

export default StarRating;
