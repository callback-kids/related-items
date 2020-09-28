import axios from 'axios';

export const getRelatedItems = (id) => axios.get(`http://52.26.193.201:3000/products/${id}/related`)
  .then((data) => data.data)
  .catch((err) => err);

export const getItemInfo = (id) => axios.get(`http://52.26.193.201:3000/products/${id}`)
  .then((data) => data.data)
  .catch((err) => err);

export const getItemPhotos = (id) => axios.get(`http://52.26.193.201:3000/products/${id}/styles`)
  .then((data) => data.data.results[0])
  .catch((err) => err);

export const getReviewData = (id) => axios.get(`http://52.26.193.201:3000/reviews/${id}/meta`)
  .then((data) => data.data)
  .catch((err) => err);

export const getCart = (session) => axios.get(`http://52.26.193.201:3000/cart/${session}`)
  .then((data) => data.data)
  .catch((err) => err);
