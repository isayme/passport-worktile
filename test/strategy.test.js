var expect = require('chai').expect;
var WorktileStrategy = require('../lib').Strategy;

describe('Strategy', function() {
  it('should be named worktile', function() {
    var strategy = new WorktileStrategy({
      clientID: 'id',
      clientSecret: 'sec'
    }, function() {});
    expect(strategy.name).to.be.equal('worktile');
  });
});
