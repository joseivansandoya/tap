import React from 'react';
import Title from '../src/components/ui/Title';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('Component: Title', () => {
  // mock properties
  const props = {
    content: 'Foo'
  }
  const title = shallow(<Title {...props} />);

  test('Title component is rendered as expected', () => {
    // evaluate title text
    expect(title.text()).toEqual('Foo');
  });
});
