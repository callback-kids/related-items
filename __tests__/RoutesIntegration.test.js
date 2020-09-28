import * as model from '../client/src/routes/apimodel';
import * as controller from '../client/src/routes/apicontroller';

const infoOutput = {
  cardType: 'related',
  category: 'Jackets',
  name: 'Camo Onesie',
  price: 140,
}

const photoOutput = {
  thumbnails: ["https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80", "https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80"],
  photos: ["https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80", "https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80"]
}

const reviewOutput = { stars: 3.72972972972973}

const data = {
  data: {
    cardType: 'related',
    category: 'Jackets',
    name: 'Camo Onesie',
    price: 140,
},
  images: {
  thumbnails: ["https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80", "https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80"],
  photos: ["https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80", "https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80"]
},
  reviews: { stars: 3.72972972972973},
}

xdescribe('getOneProductInfo', () => {
  controller.getItemInfo = jest.fn(() => Promise.resolve(infoOutput));
  controller.getItemPhotos = jest.fn(() => Promise.resolve(photoOutput));
  controller.getStars = jest.fn(() => Promise.resolve(reviewOutput));
  test('should return an object with correctly formatted data, photos and reviews', async () => {
    await expect(controller.getOneProductInfo(1, 'related')).toEqual(data);
  })
  controller.getItemInfo.mockReset();
  controller.getItemPhotos.mockReset();
  controller.getStars.mockReset();
})

xdescribe('createProductCardArray', () => {
  controller.getOneProductInfo = jest.fn(() => Promise.resolve(data));
  test('should return array of correctly formatted data', async () => {
    await expect(controller.createProductCardArray([1,2], 'related')).resolve.toEqual([data,data])
    expect(controller.getOneProductInfo.mock.calls.length).toBe(2);
  })
  controller.getOneProductInfo.mockReset();
})