import React from 'react';
import Select from '../src/components/ui/Select';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('Component: Select', () => {
  // mock properties
  const props = {
    onChange: jest.fn(),
    id: 'foo',
    label: 'Foo',
    selectedValue: '1',
    options: [
      {
        value: 1,
        content: 'bar'
      },
      {
        value: 2,
        content: 'baz'
      }
    ]
  }
  const select = shallow(<Select {...props} />);

  test('Select component is rendered as expected', () => {
    // inspect label element
    expect(select.find('label').text()).toEqual('Foo');
    // inspect first option element
    expect(select.find('select').childAt(0).text()).toEqual('- Choose one -');
    // ensure options are consistent with the data provided
    expect(select.find('select').children().length).toBe(props.options.length + 1);
  });

  test('Select onChange method is called as expected', () => {
    // simulate a change action and evaluate if onChange method was called
    select.find('select').simulate('change');
    expect(props.onChange).toBeCalled();
  });
});
