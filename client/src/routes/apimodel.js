import axios from 'axios';

export const getRelatedItems = (id) => axios.get(`http://52.26.193.201:3000/products/${id}/related`)
  .then((data) => data.data)
  .catch((err) => { throw err; });

export const getItemInfo = (id) => axios.get(`http://52.26.193.201:3000/products/${id}`)
  .then((data) => data.data)
  .catch((err) => { throw err; });

export const getItemPhotos = (id) => axios.get(`http://52.26.193.201:3000/products/${id}/styles`)
  // return photos array from the first(default) style
  .then((data) => data.data.results[0].photos)
  .catch((err) => { throw err; });

export const getReviewData = (id) => axios.get(`http://52.26.193.201:3000/reviews/${id}/meta`)
  .then((data) => data.data.ratings)
  .catch((err) => { throw err; });

export const getCart = (session) => axios.get(`http://52.26.193.201:3000/cart/${session}`)
  .then((data) => data.data)
  .catch((err) => { throw err; });
