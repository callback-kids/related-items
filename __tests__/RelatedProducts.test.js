import RelatedProducts from '../client/src/components/RelatedProducts.jsx';
import ProductCard from '../client/src/components/product_card/ProductCard.jsx';
import ProductInfo from '../client/src/components/product_card/ProductInfo';
import ThumbnailCarousel from '../client/src/components/product_card/ThumbnailCarousel';
import { mount , shallow } from 'enzyme';

describe('<RelatedProducts /> components', () => {

  let wrapper;
  let cardListLength;
  beforeEach(() => {
    // need to render a list of product cards which are passed as props here
    const data = {
      category: 'Shoes',
      name: 'blue suede',
      price: 50,
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

    const card = { data, reviews, images };

    const cards = [card, card, card, card, card, card, card];

    wrapper = mount(<RelatedProducts products={cards} />);
    cardListLength = cards.length;
  })

  test('should contain a ProductCard component', () => {
    expect(wrapper.find('RelatedProducts')).toBeTruthy();
  })
  // compare to the length of the list of product card passed above as props
  test('should render a list of ProductCard components', () => {
    expect(wrapper.find('ProductCard').length).toBe(cardListLength)
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

})



describe('<ProductInfo /> rendering', () => {

  let wrapper;

  beforeEach(() => {
    const productData = {
      category: 'Shoes',
      name: 'blue suede',
      price: 50,
    }
    const reviews = {
      stars: 3.5,
    }
    wrapper = shallow(<ProductInfo data={productData} reviews={reviews} />);
  })

  test('should display product category', () => {
    let category = wrapper.find('.product-category');
    expect(category.text()).toBe(' Shoes')
  })

  test('should display product name', () => {
    let category = wrapper.find('.product-name');
    expect(category.text()).toBe('blue suede')
  })

  test('should display product price', () => {
    let category = wrapper.find('.product-price');
    expect(category.text()).toBe('$50')
  })


})

describe('<ProductCard /> inner components', () => {

  let wrapper;

  beforeEach(() => {
    const productData = {
      category: 'Shoes',
      name: 'blue suede',
      price: 50,
    }
    const reviews = {
      stars: 4.5
    }
    const images = [
      'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
      'https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80',
      'https://images.unsplash.com/photo-1549831243-a69a0b3d39e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2775&q=80',
      'https://images.unsplash.com/photo-1527522883525-97119bfce82d?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
    ];
    wrapper = mount(<ProductCard data={productData} reviews={reviews} images={images} />);
  })

  test('should contain a StarRating component', () => {
    expect(wrapper.find('StarRating').length).toBe(1);
  })

  test('should contain a ProductInfo component', () => {
    expect(wrapper.find('ProductInfo').length).toBe(1);
  })

  test('should contain an ActionButton component', () => {
    expect(wrapper.find('ActionButton').length).toBe(1);
  })

  test('should contain a ProductImage component', () => {
    expect(wrapper.find('ProductImage').length).toBe(1);
  })

  test('should not have left and right arrow on render', () => {
    expect(wrapper.exists('.image-left-arrow')).toBe(false);
    expect(wrapper.exists('.image-right-arrow')).toBe(false);
  })


  test('should have left and right arrow on image hover', () => {
    wrapper.simulate('mouseenter');
    expect(wrapper.exists('ThumbnailCarousel')).toBe(true);
    expect(wrapper.exists('.image-left-arrow')).toBe(true);
    expect(wrapper.exists('.image-right-arrow')).toBe(true);
  })

  test('should change image on left arrow click', () => {
    wrapper.simulate('mouseenter');
    wrapper.find('.image-left-arrow').first().simulate('click')
    expect(wrapper.find('.product-image').first().prop('src')).toBe('https://images.unsplash.com/photo-1527522883525-97119bfce82d?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80')
    wrapper.find('.image-left-arrow').first().simulate('click')
    expect(wrapper.find('.product-image').first().prop('src')).toBe('https://images.unsplash.com/photo-1549831243-a69a0b3d39e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2775&q=80')
  })

  test('should change image on right arrow click', () => {
    wrapper.simulate('mouseenter');
    wrapper.find('.image-right-arrow').first().simulate('click')
    expect(wrapper.find('.product-image').first().prop('src')).toBe('https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80')
    wrapper.find('.image-right-arrow').first().simulate('click')
    wrapper.find('.image-right-arrow').first().simulate('click')
    wrapper.find('.image-right-arrow').first().simulate('click')
    expect(wrapper.find('.product-image').first().prop('src')).toBe('https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80')
  })

})

describe('<ThumbnailCarousel /> shallow render: ', () => {

  let wrapper;

  beforeEach(() => {
    const mockClickProp = jest.fn();
    wrapper = shallow(<ThumbnailCarousel click={mockClickProp} />)
  });

  test('should contain a left arrow button', () => {
    expect(wrapper.exists('.image-left-arrow')).toBe(true);
  })

  test('should contain a right arrow button', () => {
    expect(wrapper.exists('.image-right-arrow')).toBe(true);
  })

})


