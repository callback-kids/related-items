import App from '../client/src/App.jsx';
import { mount, shallow } from 'enzyme';

// describe('<App /> display', () => {
//   let wrapper;
//   beforeEach(() => {
//     wrapper = mount(<App />);
//   })

// })

describe('<App /> components', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = mount(<App />);
  })

  test('should contain a RelatedProducts component', () => {
    let stars = wrapper.find('.star-rating')
    expect(wrapper.find('RelatedProducts').length).toBe(1);
  })

  xtest('should contain an Outfit component', () => {
    let stars = wrapper.find('.star-rating')
    expect(wrapper.find('Outfit').length).toBe(1);
  })

})



