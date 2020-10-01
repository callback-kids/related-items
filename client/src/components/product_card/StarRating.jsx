import React from 'react';
import ReactStars from 'react-rating-stars-component';
import StarRatings from 'react-star-ratings';
import PropTypes from 'prop-types';

const StarRating = ({ rating }) => (

  <StarRatings
    rating={rating}
    starRatedColor="#F5B895"
    starDimension="18px"
    starSpacing="0px"
  />

);

StarRating.propTypes = {

  rating: PropTypes.number.isRequired,

};

export default StarRating;
