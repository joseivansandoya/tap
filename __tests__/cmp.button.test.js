import React from 'react';
import Button from '../src/components/ui/Button';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('Component: Button', () => {
  // mock properties
  const props = {
    onClick: jest.fn(),
    value: 'Foo'
  }
  const button = shallow(<Button {...props} />);

  test('Button text is shown as expected', () => {
    // evaluate button text
    expect(button.text()).toEqual('Foo');
  })

  test('Button onClick method is called as expected', () => {
    // simulate a click action and evaluate if onClick method was called
    button.simulate('click');
    expect(button.props().onClick).toBeCalled();
  })
});
