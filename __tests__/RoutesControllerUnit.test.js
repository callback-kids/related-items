import * as model from '../client/src/routes/apimodel';
import * as controller from '../client/src/routes/apicontroller';

describe('getRelatedItemsList', () => {

  test('should return array of related items', async () => {
    const data = [2,3,4,5];
    model.getRelatedItems = jest.fn((id) => Promise.resolve(data));
    await expect(controller.getRelatedItemsList(1)).resolves.toEqual([2,3,4,5])
  })

  test('should throw err when returned err from model', async () => {
    model.getRelatedItems = jest.fn((id) => Promise.reject(new Error('error')));
    await expect(controller.getRelatedItemsList(1)).rejects.toThrow('error')
  })

})

describe('getItemInfo', () => {
  const correctOutput = {
    cardType: 'related',
    category: 'Jackets',
    features: [
        {
          "feature": "Buttons",
          "value": "Brass",
        },
      ],
    id: 1,
    name: 'Camo Onesie',
    price: 140,
  }

  const testData = {"id":1,"name":"Camo Onesie","slogan":"Blend in to your crowd","description":"The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.","category":"Jackets","default_price":"140","features":[{"feature":"Buttons","value":"Brass"}]}

  test('should return info in correct format', async () => {
    model.getItemInfo = jest.fn((id, cardType) => Promise.resolve(testData));
    await expect(controller.getItemInfo(1, 'related')).resolves.toEqual(correctOutput);
    expect(model.getItemInfo.mock.calls.length).toBe(1);
  })

  test('should throw err when api returns error', async () => {
    model.getItemInfo = jest.fn((id, cardType) => Promise.reject(new Error('error')));
    await expect(controller.getItemInfo(1, 'related')).rejects.toThrow('error');
    expect(model.getItemInfo.mock.calls.length).toBe(1);
  })

})

describe('getItemPhotos', () => {
  const testData = [{"thumbnail_url":"https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80"}];

  const nullTestData = [{"thumbnail_url":null,"url":null}]

  const formattedData = {
    thumbnails: ["https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80", "https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80"],
    photos: ["https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80", "https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80"]
  };

  const nullData = {
    thumbnails: ['https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg'],
    photos: ['https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg'],
  };

  test('should return two arrays of item photos', async () => {
    model.getItemPhotos = jest.fn((id) => Promise.resolve(testData));
    await expect(controller.getItemPhotos(1)).resolves.toEqual(formattedData);
    expect(model.getItemPhotos.mock.calls.length).toBe(1);
  });

  test('should return default images of api data is null', async () => {
    model.getItemPhotos = jest.fn((id) => Promise.resolve(nullTestData));
    await expect(controller.getItemPhotos(1)).resolves.toEqual(nullData);
  })


  test('should throw err when api returns error', async () => {
    model.getItemPhotos = jest.fn((id) => Promise.reject(new Error('error')));
    await expect(controller.getItemPhotos(1)).rejects.toThrow('error');
  })

})

describe('getStars', () => {
  const testData = {"1":1,"2":3,"3":11,"4":12,"5":10}

  const formattedData = { stars: 3.72972972972973}

  test('should return avg star rating from api request', async () => {
    model.getReviewData = jest.fn((id) => Promise.resolve(testData));
    await expect(controller.getStars(1)).resolves.toEqual(formattedData);
    expect(model.getReviewData.mock.calls.length).toBe(1);
  })

  test('should return 0 if no reviews found', async () => {
    model.getReviewData = jest.fn((id) => Promise.resolve({}));
    await expect(controller.getStars(1)).resolves.toEqual({ stars: 0 });
  })

  test('should throw err when api returns error', async () => {
    model.getReviewData = jest.fn((id) => Promise.reject(new Error('error')));
    await expect(controller.getStars(1)).rejects.toThrow('error');
  })

})

xdescribe('getOneProductInfo', () => {
  test('should return data in correct format', async () => {
    const info = {
      cardType: 'related',
      category: 'Jackets',
      features: [
          {
            "feature": "Buttons",
            "value": "Brass",
          },
        ],
      id: 1,
      name: 'Camo Onesie',
      price: 140,
    }
    const pics = {
      thumbnails: ["https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80", "https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80"],
      photos: ["https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80", "https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80"]
    }
    const review = { stars: 3.72972972972973}
    const correctOutput = {
    data: info,
    images: pics,
    reviews: review,
  }
  controller.getItemInfo = jest.fn((id) => Promise.resolve(info));
  controller.getItemPhotos = jest.fn((id) => Promise.resolve(pics));
  controller.getStars = jest.fn((id) => Promise.resolve(review));
  await expect(controller.getOneProductInfo(1, 'related')).resolves.toEqual(correctOutput);
  })

  test('should throw err when api returns error', async () => {
    controller.getItemInfo = jest.fn((id) => Promise.reject(new Error('error')));
    await expect(controller.getOneProductInfo(1)).rejects.toThrow('error');
  })

})

xdescribe('createProductCardArray', () => [

  test('should return array of product cards', async () => {
    const info = {
      cardType: 'related',
      category: 'Jackets',
      features: [
          {
            "feature": "Buttons",
            "value": "Brass",
          },
        ],
      id: 1,
      name: 'Camo Onesie',
      price: 140,
    }
    const pics = {
      thumbnails: ["https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80", "https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80"],
      photos: ["https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80", "https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80"]
    }
    const review = { stars: 3.72972972972973}
    const correctOutput = {
    data: info,
    images: pics,
    reviews: review,
  }
  })
])
