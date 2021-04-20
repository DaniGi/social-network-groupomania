import { expect } from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import LikeButton from './LikeButton';

describe('<LikeButton/>', () => {
  it('should trigger its `toggleLike` prop when clicked', () => {
    const onClick = sinon.spy();
    const wrapper = shallow(<LikeButton userLiked={false} toggleLike={onClick} />);

    wrapper.simulate('click');
    expect(onClick).to.have.been.calledWith(false);
  });
});
