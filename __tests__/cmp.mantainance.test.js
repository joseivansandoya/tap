import React from 'react';
import Mantainance from '../src/components/Mantainance';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('Component: Mantainance', () => {
  // mock properties
  const props = {
    handleChange: jest.fn(),
    storeMantainance: jest.fn(),
    resetAll: jest.fn()
  }

  const mantainance = mount(<Mantainance {...props} />);

  test('Mantainance component is rendered as expected', () => {
    // inspect Title element
    expect(mantainance.find('Title').find('h2').text()).toEqual('Mantainance');
    // inspect Select element
    expect(mantainance.find('Select').length).toBe(3);
    // inspect Button element
    expect(mantainance.find('Button').length).toBe(2);
  });
});
