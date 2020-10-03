import axios from 'axios';
import * as model from '../client/src/routes/apimodel.js'

jest.mock('axios');

describe('getRelatedItems', () => {

  const items = [2,3,4,5];
  const resp = {data: items}

  test('should fetch related items array', async () => {
    axios.get.mockResolvedValue(resp)

    await expect(model.getRelatedItems(2)).resolves.toBe(items);
  })

  test('should fetch related items array', async () => {
    axios.get.mockRejectedValue(new Error('error'))

    await expect(model.getRelatedItems(2)).rejects.toThrow('error');
  })
})

describe('getItemInfo', () => {

  const info = {"id":1,"name":"Camo Onesie","slogan":"Blend in to your crowd","description":"The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.","category":"Jackets","default_price":"140","features":[{"feature":"Buttons","value":"Brass"}]};
  const resp = {data: info}

  test('should fetch related items array', async () => {
    axios.get.mockResolvedValue(resp)

    await expect(model.getItemInfo(2)).resolves.toBe(info);
  })

  test('should fetch related items array', async () => {
    axios.get.mockRejectedValue(new Error('error'))

    await expect(model.getItemInfo(2)).rejects.toThrow('error');
  })
})

describe('getItemPhotos', () => {

  const info = {
    results: [{photos: 'pass'}, {photos: 'fail'}]
  };
  const resp = {data: info};

  test('should fetch related items array', async () => {
    axios.get.mockResolvedValue(resp)

    await expect(model.getItemPhotos(2)).resolves.toBe('pass');
  })

  test('should fetch related items array', async () => {
    axios.get.mockRejectedValue(new Error('error'))

    await expect(model.getItemPhotos(2)).rejects.toThrow('error');
  })
})

describe('getReviewData', () => {

  const info = {ratings: [1,2,3]};
  const resp = {data: info};

  test('should fetch related items array', async () => {
    axios.get.mockResolvedValue(resp)

    await expect(model.getReviewData(2)).resolves.toEqual([1,2,3]);
  })

  test('should fetch related items array', async () => {
    axios.get.mockRejectedValue(new Error('error'))

    await expect(model.getReviewData(2)).rejects.toThrow('error');
  })
})