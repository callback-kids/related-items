import Outfit from '../client/src/components/Outfit';
import OutfitCard from '../client/src/components/outfit_card/OutfitCard';
import { mount , shallow } from 'enzyme';

describe('<Outfit /> ', () => {
  let wrapper;
  let cardListLength;
  let cards;
  let card;
  beforeEach(() => {
    const data = {
      cardType: 'related',
      category: 'Shoes',
      name: 'blue suede',
      price: 50,
      id: 1,
    };

    const reviews = {
      stars: 3,
    };

    const images = {thumbnails: [
      'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
      'https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80',
      'https://images.unsplash.com/photo-1549831243-a69a0b3d39e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2775&q=80',
      'https://images.unsplash.com/photo-1527522883525-97119bfce82d?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
    ]};

    const data2 = {
      cardType: 'related',
      category: 'Shoes',
      name: 'red',
      price: 50,
      id: 2,
    };

    const reviews2 = {
      stars: 3,
    };

    const images2 = {thumbnails: [
      'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
      'https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80',
      'https://images.unsplash.com/photo-1549831243-a69a0b3d39e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2775&q=80',
      'https://images.unsplash.com/photo-1527522883525-97119bfce82d?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
    ]};

    const oneItem = { data: data2, reviews: reviews2, images: images2 }

    card = { data, reviews, images };

    cards = [card, card, card, card, card, card, card];

    wrapper = mount(<Outfit outfit={cards} currentItem={oneItem} />);
    cardListLength = cards.length;
  })

  test('should contain a carousel container', () => {
    expect(wrapper.find('.carousel-container')).toExist();
  })

  test('should contain an OutfitCard component', () => {
    expect(wrapper.find('OutfitCard')).toExist();
  })
  // compare to the length of the list of product card passed above as props
  test('should render a list of OutfitCard components', () => {
    expect(wrapper.find('OutfitCard').length).toBe(cardListLength)
  })

  test('should contain a right arrow button', () => {
    expect(wrapper.find('.right-button').length).toBe(2);
  })

  test('should not contain a left arrow button', () => {
    expect(wrapper.find('.left-button').length).toBe(0);
  })

  test('should have left arrow appear once right arrow has been clicked once', () => {
    wrapper.find('.right-button').first().simulate('click')
    expect(wrapper.find('.left-button').length).toBe(2);
  })

  test('should have left arrow disappear once right arrow has been clicked once and then left arrow is clicked once', () => {
    wrapper.find('.right-button').first().simulate('click')
    expect(wrapper.find('.left-button').length).toBe(2);
    wrapper.find('.left-button').first().simulate('click')
    expect(wrapper.find('.left-button').length).toBe(0);
  })

  test('should have right arrow disappear once right arrow has been cards.length - 3 times', () => {
    expect(wrapper.find('.right-button').length).toBe(2);
    wrapper.find('.right-button').first().simulate('click')
    wrapper.find('.right-button').first().simulate('click')
    wrapper.find('.right-button').first().simulate('click')
    wrapper.find('.right-button').first().simulate('click')
    expect(wrapper.find('.right-button').length).toBe(0);
  })

  test('should remove card from list when card-button is clicked', () => {
    expect(wrapper.find('OutfitCard').length).toBe(cardListLength)
    wrapper.find('.card-button').first().simulate('click')
    expect(wrapper.find('OutfitCard').length).toBe(0)
  })

  test('should add card to list when plus button is clicked', () => {
    expect(wrapper.find('OutfitCard').length).toBe(cardListLength)
    wrapper.find('.outfit-add-button').first().simulate('click');
    expect(wrapper.find('OutfitCard').length).toBe(cardListLength + 1)
  })

  test('should not add card when id is already in list', () => {
    wrapper = mount(<Outfit outfit={cards} currentItem={card} />)
    expect(wrapper.find('OutfitCard').length).toBe(cardListLength)
    wrapper.find('.outfit-add-button').first().simulate('click');
    expect(wrapper.find('OutfitCard').length).toBe(cardListLength)
  })

})

describe('<OutfitCard />', () => {
  let wrapper;
  const data = {
    cardType: 'related',
    category: 'Shoes',
    name: 'blue suede',
    price: 50,
    id: 1,
  };

  const reviews = {
    stars: 3,
  };

  const images = {thumbnails: [
    'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
    'thumbnail_url":"https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1549831243-a69a0b3d39e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2775&q=80',
    'https://images.unsplash.com/photo-1549831243-a69a0b3d39e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
  ]};

  beforeEach(() => {
    wrapper = mount(<OutfitCard data={data} reviews={reviews} images={images}/>)
  })

  test('should display left/right arrows on mouseenter and hide on mouseleave', () => {
    expect(wrapper.find('ThumbnailCarousel').length).toBe(0);
    wrapper.simulate('mouseenter');
    expect(wrapper.find('ThumbnailCarousel').length).toBe(1);
    wrapper.simulate('mouseleave');
    expect(wrapper.find('ThumbnailCarousel').length).toBe(0);
  })

  test('should change to correct image on left arrow click', () => {
    expect(wrapper.find('OutfitImage').props().mainImage).toEqual(images[0])
    wrapper.simulate('mouseenter');
    wrapper.find('.image-left-arrow').first().simulate('click');
    expect(wrapper.find('OutfitImage').props().mainImage).toEqual(images[images.length - 1])
  })

  test('should change to correct image on rightarrow click', () => {
    expect(wrapper.find('OutfitImage').props().mainImage).toEqual(images[0])
    wrapper.simulate('mouseenter');
    wrapper.find('.image-right-arrow').first().simulate('click');
    expect(wrapper.find('OutfitImage').props().mainImage).toEqual(images[1])
  })

})
