var expect = require('chai').expect;
var Profile = require('../lib/profile');
var userProfile = {
  "uid": "12c55ed2d8994db5946b999c35c2df20",
  "name": "isayme",
  "display_name": "吴国强",
  "email": "isayme@163.com",
  "desc": "",
  "avatar": "empty",
  "status": 1,
  "online": 0
};

describe('profile', function() {
  it('should parse ok', function() {
    var profile = Profile.parse(userProfile);
    expect(profile.displayName).to.be.equal(userProfile.display_name);
    expect(profile.photoUrl).to.be.equal(userProfile.avatar);
    expect(profile.emails).to.be.a('array');
    expect(profile.emails[0].value).to.be.equal(userProfile.email);
    expect(profile.photos).to.be.a('array');
    expect(profile.photos[0]).to.be.equal(userProfile.avatar);
  });
});
