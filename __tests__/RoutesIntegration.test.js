import * as model from '../client/src/routes/apimodel';
import * as controller from '../client/src/routes/apicontroller';

/********************
 tests still in progress, can't get async promise chain to mock correctly
 *******************/
jest.mock('../client/src/routes/apicontroller');

const infoOutput = {
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

  controller.getItemInfo.mockResolvedValue(infoOutput);
  controller.getItemPhotos.mockResolvedValue(photoOutput);
  controller.getStars.mockResolvedValue(reviewOutput);

  test('should return an object with correctly formatted data, photos and reviews', () => {
    expect(controller.getOneProductInfo(1, 'related')).toEqual(data);
  })

})

xdescribe('createProductCardArray', () => {
  controller.getOneProductInfo = jest.fn(() => Promise.resolve(data));
  test('should return array of correctly formatted data', async () => {
    await expect(controller.createProductCardArray([1,2], 'related')).resolve.toEqual([data,data])
    expect(controller.getOneProductInfo.mock.calls.length).toBe(2);
  })
  controller.getOneProductInfo.mockReset();
})