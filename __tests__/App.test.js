import App from '../client/src/App.jsx';
import * as controller from '../client/src/routes/apicontroller';
import { mount, shallow, } from 'enzyme';
import { Route } from 'react-router-dom';

describe('<App /> components', () => {

  let wrapper;
  const props = {
    match: {
      params:
        {
          id: 4,
        }
      },
   };

  beforeEach(() => {
    controller.getAllProductInfo = jest.fn((id, cardType) => Promise.resolve('getAll'))
    controller.getOneProductInfo = jest.fn((id, cardType) => Promise.resolve('getOne'))
    wrapper = shallow(
    <App {...props} />
    );
  })

  test('should contain a RelatedProducts component', () => {
    expect(wrapper.find('RelatedProducts').length).toBe(1);
  })

  test('should contain an Outfit component', () => {
    expect(wrapper.find('Outfit').length).toBe(1);
  })

  test('updates state on mounting', () => {
    expect(wrapper.state().relatedItems).toBe('getAll');
    expect(wrapper.state().featuredProductData).toBe('getOne');
  })

})



