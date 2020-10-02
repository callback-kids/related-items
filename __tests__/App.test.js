import App from '../client/src/App.jsx';
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

})



