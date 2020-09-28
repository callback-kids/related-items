import axios from 'axios';
import * as model from './apimodel';

const formatItemInfo = (itemInfo, cardType) => {
  // create obj with cardtype, category, name and price
  const formattedItemInfo = {
    cardType,
    category: itemInfo.category,
    name: itemInfo.name,
    price: itemInfo.default_price,
  };
  return formattedItemInfo;
};

export const getItemInfo = (id, cardType) => model.getItemInfo(id)
  .then((itemInfo) => formatItemInfo(itemInfo, cardType))
  .catch((err) => { console.log(err); });

const formatItemPhotos = (images) => {

};

const getItemPhotos = (id) => {

};

export const getStars = (id) => {

};

export const getCart = () => {

};
