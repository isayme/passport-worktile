var express = require('express');
var passport = require('passport');
var WorktileStrategy = require('passport-worktile').Strategy;

var WORKTILE_CLIENT_ID = '--insert-worktile-client-id-here--';
var WORKTILE_CLIENT_SECRET = '--insert-worktile-client-secret-here--';

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new WorktileStrategy({
    clientID: WORKTILE_CLIENT_ID,
    clientSecret: WORKTILE_CLIENT_SECRET,
    callbackURL: 'http://example.com/oauth2/worktile/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(accessToken, refreshToken, profile)
    return done(null, profile);
  }
));

var app = express();
app.use(passport.initialize());
// app.use(passport.session());

app.get('/oauth2/worktile/callback',
  passport.authenticate('worktile'),
  function(req, res) {
    res.json(req.user);
  });

app.listen(80, function() {
  console.log('listening ...');
});
