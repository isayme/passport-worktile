var expect = require('chai').expect;
var ProcessonStrategy = require('../lib').Strategy;

describe('Strategy', function() {
  it('should be named processon', function() {
    var strategy = new ProcessonStrategy({
      clientID: 'id',
      clientSecret: 'sec'
    }, function() {});
    expect(strategy.name).to.be.equal('processon');
  });
});
