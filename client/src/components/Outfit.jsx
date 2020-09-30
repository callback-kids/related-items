import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import AddItem from './outfit_card/AddItem';
import OutfitCard from './outfit_card/OutfitCard';

const data = {
  cardType: 'outfit',
  category: 'Shoes',
  name: 'blue suede',
  price: 50,
};

const reviews = {
  stars: 3.5,
};

const images = {
  thumbnails: [
    'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
    'https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80',
    'https://images.unsplash.com/photo-1549831243-a69a0b3d39e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2775&q=80',
    'https://images.unsplash.com/photo-1527522883525-97119bfce82d?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80'],
};

const card = { data, reviews, images };

const Outfit = ({ outfit, currentItem }) => {
  // need state for outfit to add items later
  const [currentOutfit, updateOutfit] = useState(outfit);
  const [currentCardIndex, changeCardIndex] = useState(0);
  // used to automatically render a right arrow on mount
  const [scrollLength, updateScrollLength] = useState(4);
  const [offset, updateOffset] = useState(0);

  useEffect(() => {
    // need to wait for a product card to mount
    setTimeout(() => {
      const cardWidth = document.querySelector('.product-card-wrapper').offsetWidth;
      const carouselWidth = document.querySelector('.carousel-container').clientWidth;
      const scrollCards = Math.floor(carouselWidth / (cardWidth + 20));
      // update scroll length to respond to number of cards relative to carousel width
      // add 1 here because you always have the add to outfit card
      updateScrollLength((currentOutfit.length + 1) - scrollCards);
      // 20 is the right margin between cards
      updateOffset(cardWidth + 20);
    }, 0.1);
  }, [outfit, currentOutfit]);

  const goRight = () => {
    if (currentCardIndex < scrollLength) {
      changeCardIndex(currentCardIndex + 1);
    }
  };

  const goLeft = () => {
    if (currentCardIndex > 0) {
      changeCardIndex(currentCardIndex - 1);
    }
  };

  const addToOutfit = () => {
    const newOutfit = currentOutfit.slice();
    newOutfit.push(currentItem);
    updateOutfit(newOutfit);
  };

  const removeFromOutfit = (name) => {
    // find items with same name in currentOutfit and remove
    const newOutfit = currentOutfit.filter((item) => item.data.name !== name);
    updateOutfit(newOutfit);
  };

  return (
    <div className="carousel-container">
      <div className="cards-slider">
        <div
          className="cards-slider-wrapper"
          style={{
            // moves carousel to the left relative to the container
            transform: `translateX(-${offset * currentCardIndex}px)`,
          }}
        >
          <AddItem addItem={addToOutfit} />
          {currentOutfit.map((value) => (
            <OutfitCard
              data={value.data}
              images={value.images.thumbnails}
              reviews={value.reviews}
              remove={removeFromOutfit}
            />
          ))}
        </div>
      </div>
      {currentCardIndex > 0 ? <Button onClick={goLeft} className="arrow-button left-button" type="button">⇦</Button> : ''}
      {currentCardIndex < scrollLength ? <Button onClick={goRight} className="arrow-button right-button" type="button">⇨</Button> : ''}
    </div>
  );
};

Outfit.propTypes = {

  outfit: PropTypes.arrayOf(PropTypes.object).isRequired,

  currentItem: PropTypes.shape({
    cardType: PropTypes.string.isRequired,
    category: PropTypes.string,
    name: PropTypes.string.isRequired,
    price: PropTypes.number,
    features: PropTypes.arrayOf(PropTypes.shape({
      feature: PropTypes.string,
      value: PropTypes.string,
    })),
  }).isRequired,

};

export default Outfit;
