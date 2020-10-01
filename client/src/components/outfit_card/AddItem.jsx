import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const AddItem = ({ addItem }) => (

  <div className="product-card-wrapper">

    <Card className="product-card add-card">

      {/* i is the icon image, button is used for the on click function */}
      <i className="fas fa-plus outfit-button-position" />
      <Button variant="outline-light" onClick={addItem} className="outfit-add-button outfit-button-position" />

    </Card>

  </div>
);

AddItem.propTypes = {
  addItem: PropTypes.func.isRequired,
};

export default AddItem;
