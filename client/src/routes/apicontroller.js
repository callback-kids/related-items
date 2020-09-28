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

const formatItemPhotos = (itemPhotos) => {
  const thumbnails = [];
  const photos = [];
  // each item in array has a thumbnail image url and regular image url
  itemPhotos.forEach((value) => {
    thumbnails.push(value.thumbnail_url);
    photos.push(value.url);
  });
  // return array of thumbnails and regular photos
  return {
    thumbnails,
    photos,
  };
};

export const getItemPhotos = (id) => model.getItemPhotos(id)
  .then((itemPhotos) => formatItemPhotos(itemPhotos))
  .catch((err) => { console.log(err); });

export const getStars = (id) => {

};

export const getCart = (session) => model.getCart(session)
  .then((cart) => cart)
  .catch((err) => console.log(err));
