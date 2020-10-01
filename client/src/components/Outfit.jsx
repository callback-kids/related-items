import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import AddItem from './outfit_card/AddItem';
import OutfitCard from './outfit_card/OutfitCard';

const Outfit = ({ outfit, currentItem }) => {
  // need state for outfit to add items later
  const [currentOutfit, updateOutfit] = useState(outfit);
  const [currentCardIndex, changeCardIndex] = useState(0);
  // used to automatically render a right arrow on mount
  const [scrollLength, updateScrollLength] = useState(4);
  const [offset, updateOffset] = useState(0);

  // used to update initial state of the currentOutfit after mount
  useEffect(() => {
    updateOutfit(outfit);
  }, [outfit]);

  // used to update scroll width on currentOutfit length change
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
  }, [currentOutfit]);

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
    // update local storage with new outfit
    localStorage.savedOutfit = JSON.stringify(newOutfit);
  };

  const removeFromOutfit = (id) => {
    // find items with same name in currentOutfit and remove
    const newOutfit = currentOutfit.filter((item) => item.data.id !== id);
    updateOutfit(newOutfit);
    // if outfit is empty, clear local storage, otherwise update with new outfit
    if (newOutfit.length === 0) {
      localStorage.removeItem('savedOutfit');
    } else {
      localStorage.savedOutfit = JSON.stringify(newOutfit);
    }
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
    id: PropTypes.number,
    features: PropTypes.arrayOf(PropTypes.shape({
      feature: PropTypes.string,
      value: PropTypes.string,
    })),
  }).isRequired,

};

export default Outfit;
