import React from 'react';
import Preview from '../src/components/Preview';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('Component: Preview', () => {
  // mock properties
  const props = {
    updateInteraction: jest.fn(),
  }

  const preview = mount(<Preview {...props} />);

  test('Preview component is rendered as expected', () => {
    // inspect Title element
    expect(preview.find('Title').find('h2').text()).toEqual('Preview');
    // inspect vieport element
    expect(preview.exists('.viewport')).toBeTruthy();
  });

  test('Preview updateInteraction method is called as expected', () => {
    preview.find('.viewport').find('.header').simulate('click');
    preview.find('.viewport').find('.body').simulate('click');
    preview.find('.viewport').find('.footer').simulate('click');
    expect(props.updateInteraction).toBeCalled();
  });
});
