import * as model from './apimodel';

export const getRelatedItemsList = (id) => model.getRelatedItems(id)
  .then((items) => items)
  .catch((err) => console.log(err));

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

// return product item info
const getItemInfo = (id, cardType) => model.getItemInfo(id)
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

// return items photos
const getItemPhotos = (id) => model.getItemPhotos(id)
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

// return avg star rating for item
const getStars = (id) => model.getReviewData(id)
  // data comes in as number of reviews per star rating, need to calculate avg and return
  .then((reviewData) => calculateStars(reviewData))
  .catch((err) => console.log(err));

export const getCart = (session) => model.getCart(session)
  .then((cart) => cart)
  .catch((err) => console.log(err));

// retrieves and formats info for one product card
const getOneProductInfo = (id) => {
  const itemInfo = {};
  return getItemInfo(id)
    .then((info) => {
      itemInfo.data = info;
      return getItemPhotos(id);
    })
    .then((photos) => {
      itemInfo.images = photos;
      return getStars(id);
    })
    .then((stars) => {
      itemInfo.reviews = stars;
      return itemInfo;
    })
    .catch((err) => { throw err; });
};

// creates array comprised of the promises returned from calling getoneproductinfo
const createProductCardArray = (productList) => {
  const returnArray = [];
  for (let i = 0; i < productList.length; i + 1) {
    returnArray.push(getOneProductInfo(productList[i]));
  }
  return returnArray;
};

// gets relateditems list and returns array of objects containing info for each item
export const getAllProductInfo = (id) => {
  getRelatedItemsList(id)
  // get list of related product id's
    .then((relatedItemsList) => {
      createProductCardArray(relatedItemsList);
      return Promise.all(relatedItemsList)
        .then((cardsArray) => cardsArray);
    })
    .catch((err) => { throw err; });
};
