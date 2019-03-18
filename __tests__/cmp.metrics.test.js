import React from 'react';
import Metrics from '../src/components/Metrics';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('Component: Metrics', () => {
  const metrics = mount(<Metrics />);

  test('Metrics component is rendered as expected', () => {
    // inspect Title element
    expect(metrics.find('Title').find('h2').text()).toEqual('Metrics (last configuration)');
    // inspect tab;e element
    expect(metrics.find('table').length).toBe(1);
    // inspect table >> tr element
    expect(metrics.find('table').find('tr').length).toBe(4);
  });
});
