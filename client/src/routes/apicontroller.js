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

const calculateStars = (starData) => {
  // used to count total number of reviews
  let reviewCount = 0;
  let reviewAvg = 0;
  const entries = Object.entries(starData);
  // edge case, no reviews
  if (entries.length === 0) {
    return 0;
  }
  // reviews are in form of value: total number of reviews
  entries.forEach((review) => {
    reviewCount += review[1];
    // multiply number of reviews by review value
    reviewAvg += (review[0] * review[1]);
  });
  reviewAvg /= reviewCount;
  return { stars: reviewAvg };
};

export const getStars = (id) => model.getReviewData(id)
  // data comes in as number of reviews per star rating, need to calculate avg and return
  .then((reviewData) => calculateStars(reviewData))
  .catch((err) => console.log(err));

export const getCart = (session) => model.getCart(session)
  .then((cart) => cart)
  .catch((err) => console.log(err));
