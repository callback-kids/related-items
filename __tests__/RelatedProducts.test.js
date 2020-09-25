import RelatedProducts from '../client/src/components/RelatedProducts.jsx';
import ProductCard from '../client/src/components/related_products/ProductCard.jsx'
import { mount , shallow } from 'enzyme';

describe('<RelatedProducts /> components', () => {

  let wrapper;
  let cardListLength;
  beforeEach(() => {
    // need to render a list of product cards which are passed as props here
    const cards = [
      {
        productInfo: {
          category: 'Shoes',
          name: 'blue suede',
          price: 50,
      },
        review: {
          stars: 3
        }
    },
    {
      productInfo: {
        category: 'Jacket',
        name: 'pants, jacket, shirt',
        price: 100,
    },
      review: {
        stars: 4
      }
  },
    ]
    wrapper = mount(<RelatedProducts products={cards} />);
  })

  test('should contain a ProductCard component', () => {
    expect(wrapper.find('RelatedProducts')).toBeTruthy();
  })
  // compare to the length of the list of product card passed above as props
  test('should render a list of ProductCard components', () => {
    expect(wrapper.find('RelatedProducts').length).toBe(cardListLength)
  })

  test('should contain an Outfit component', () => {
    expect(wrapper.find('Outfit').length).toBe(1);
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
    expect(wrapper.find('StarRating').length).toBe(1);
  })

})

// describe('<StarRating />', () => {

//   test('should have a prop for star rating', () => {

//   })

// })

