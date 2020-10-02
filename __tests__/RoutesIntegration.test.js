import * as model from '../client/src/routes/apimodel';
import * as controller from '../client/src/routes/apicontroller';

/********************
 tests still in progress, can't get async promise chain to mock correctly
 *******************/
jest.mock('../client/src/routes/apicontroller');

const infoOutput = {
  info: 'test'
}

const photoOutput = {
  photos: 'test'
}

const reviewOutput = { stars: 'test'}

const data = {
  data: {
    cardType: 'related',
    info: 'test',
},
  images: {
    photos: 'test'
},
  reviews: { stars: 'test'},
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