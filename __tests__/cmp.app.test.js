import React from 'react';
import App from '../src/App';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('Component: App', () => {
  // mock properties
  const props = {
    w: 1
  }
  const app = shallow(<App {...props} />);

  test('App component is rendered as expected', () => {
    // inspect h1 element
    expect(app.find('h1').length).toBe(1);
    // inspect Mantainance component
    expect(app.find('Mantainance').length).toBe(1);
    // inspect Metrics component
    expect(app.find('Metrics').length).toBe(1);
    // inspect Preview component
    expect(app.find('Preview').length).toBe(1);

    //console.log('app', app.instance());
  });

  // component.instance().render = jest.fn();
  // component.instance().forceUpdate();
  test('App handleChange method is working as expected', () => {
    const mockedEvent = {
      target: {
        value: '1'
      }
    }
    // call method handleChange
    app.instance().handleChange('header', mockedEvent);
    expect(app.state().header).toBe(mockedEvent.target.value);
  });

  test('App resetAll method is working as expected', () => {
    const originalState = {
      header: '',
      headerInteractions: 0,
      body: '',
      bodyInteractions: 0,
      footer: '',
      footerInteractions: 0,
      notPersisted: false,
      error: false
    }

    // call method resetAll
    app.instance().resetAll();
    expect(app.state()).toEqual(originalState);
  });

  test('App storeMantainance method is working as expected', () => {
    app.instance().storeMantainance();
    expect(app.state().error).toBeTruthy();
  });

  test('App updateInteraction method is working as expected', () => {
    app.instance().updateInteractionsState = jest.fn();
    const result = {
      response: {
        status: 200,
        json: () => {
          foo: 'bar'
        }
      }
    }
    window.fetch = jest.fn();
    fetch.mockReturnValue(Promise.resolve(result));
    app.instance().updateInteraction({foo: 'bar'});
    expect(fetch).toBeCalled();
  });
});
