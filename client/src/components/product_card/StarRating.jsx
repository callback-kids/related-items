import React from 'react';
import ReactStars from 'react-rating-stars-component';
import PropTypes from 'prop-types';

const StarRating = ({ rating }) => (
  <ReactStars
    count={5}
    size="vh"
    isHalf
    edit={false}
    value={rating}
    activeColor="#ffd700"
  />
);

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
};

export default StarRating;
