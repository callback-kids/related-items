import RelatedProducts from '../client/src/components/RelatedProductsjsx';
import ProductCard from '../client/src/components/related_products/ProductCard.jsx'
import { mount , shallow } from 'enzyme';

describe('<RelatedProducts /> components', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = mount(<RelatedProducts />);
  })

})


describe('<RelatedProducts /> rendering', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<RelatedProducts />);
  })

  test('should contain a descriptive header for related products', () => {
    expect(wrapper.find('.products-header').text()).toBe('Related Products');
  })

  test('should contain a descriptive header for your outfit', () => {
    expect(wrapper.find('.outfit-header').text()).toBe('Your Outfit');
  })

})

describe('<ProductCard /> rendering', () => {

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
    wrapper = shallow(<ProductCard data={productData} reviews={reviews} />);
  })

  test('should display product category', () => {
    let category = wrapper.find('.product-category');
    expect(category.text()).toBe('Shoes')
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
    wrapper = mount(<ProductCard data={productData} reviews={reviews} />);
  })

  test('should contain a StarRating component', () => {
    let stars = wrapper.find('.star-rating')
    expect(wrapper.find('StarRating').length).toBe(1);
  })

})

