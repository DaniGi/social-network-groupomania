import { expect } from 'chai';
import React from 'react';
import { shallow } from 'enzyme';

import App from './App';
import Footer from './components/Footer';

describe('<App />', () => {
  it('contains Footer', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).to.contain(<Footer />);
  });
  it('contains 4 Routes', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('Route')).to.have.length(4);
  });
});
