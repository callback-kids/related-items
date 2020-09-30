import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const AddItem = () => {
  return (
    <div className="product-card-wrapper">
      <Card className="product-card">
        <Button>+</Button>
      </Card>
    </div>
  );
};

export default AddItem;
