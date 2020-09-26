import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

const ActionButton = ({ cardType }) => (

  <Button variant="secondary" className="card-button" type="button">{cardType === 'related' ? '★' : '✖'}</Button>

);

ActionButton.propTypes = {

  cardType: PropTypes.string.isRequired,

};

export default ActionButton;
