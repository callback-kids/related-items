import axios from 'axios';

export const getRelatedItems = (id) => {
  axios.get(`http://52.26.193.201:3000/${id}/related`)
    .then((data) => data)
    .catch((err) => err);
};

export const getItemData = (id) => {
  axios.get(`http://52.26.193.201:3000/${id}`)
    .then((data) => data)
    .catch((err) => err);
};

export const getReviewData = (id) => {
  axios.get(`http://52.26.193.201:3000/reviews/${id}/meta`)
    .then((data) => data)
    .catch((err) => err);
};

export const getCart = (session) => {
  axios.get(`http://52.26.193.201:3000/cart/${session}`)
    .then((data) => data)
    .catch((err) => err);
};
