import { expect } from 'chai';
import { getDateFormatted } from './dateFormatting';

describe('post/comment date formatting', () => {
  it('says we have time-travelled', () => {
    const date = '2022-03-26 08:21:02';
    expect(getDateFormatted(date)).to.deep.equal('Seems your post/comment has time-travelled...');
  });
  it('return the date and hour', () => {
    const date = '2020-03-26 08:21:02';
    expect(getDateFormatted(date)).to.deep.equal('26 March at 8:21');
  });
  it('return a string', () => {
    const date = '2020-03-26 08:21:02';
    expect(getDateFormatted(date)).to.be.a('string');
  });
});
