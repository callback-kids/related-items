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
    price: parseInt(itemInfo.default_price, 10),
    features: itemInfo.features,
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
    if (value.url === null || value.thumbnail_url === null) {
      // default, image not found, image
      thumbnails.push('https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg');
      photos.push('https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg');
    } else {
      thumbnails.push(value.thumbnail_url);
      photos.push(value.url);
    }
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
    return { stars: 0 };
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
const getOneProductInfo = (id, cardType) => {
  const itemInfo = {};
  return getItemInfo(id)
    .then((info) => {
      itemInfo.data = {
        ...info,
        cardType,
      };
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
const createProductCardArray = (productList, cardType) => {
  const returnArray = [];
  for (let i = 0; i < productList.length; i += 1) {
    returnArray.push(getOneProductInfo(productList[i], cardType));
  }
  return returnArray;
};

// gets relateditems list and returns array of objects containing info for each item
// cardtype is either 'related' or 'outfit'
export const getAllProductInfo = (id, cardType) => getRelatedItemsList(id)
  // get list of related product id's
  .then((relatedItemsList) => {
    const promiseList = createProductCardArray(relatedItemsList, cardType);
    return Promise.all(promiseList)
      .then((cardsArray) => cardsArray);
  })
  .catch((err) => { console.log(err); });
