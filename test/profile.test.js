var expect = require('chai').expect;
var Profile = require('../lib/profile');
var userProfile = {
  data: {
    identity: 'worker',
    profileUrl: 'https://www.processon.com/u/568f681ae4b037f3382ca123/profile',
    _id: '568f681ae4b037f3382ca124',
    email: 'isayme@163.com',
    userName: '568f681ae4b037f3382ca123',
    fullName: 'isayme',
    photoUrl: 'https://www.processon.com/file/568f68a4e4b037f3382caa98/photo',
    registDate: '2016-01-08 15:41:14'
  },
  status: 'success'
};

describe('profile', function() {
  it('should parse ok', function() {
    var profile = Profile.parse(userProfile);
    expect(profile.displayName).to.be.equal(userProfile.data.fullName);
    expect(profile.photoUrl).to.be.equal(userProfile.data.photoUrl);
    expect(profile.profileUrl).to.be.equal(userProfile.data.profileUrl);
    expect(profile.emails).to.be.a('array');
    expect(profile.emails[0].value).to.be.equal(userProfile.data.email);
    expect(profile.photos).to.be.a('array');
    expect(profile.photos[0]).to.be.equal(userProfile.data.photoUrl);
  });
});
