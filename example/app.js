var express = require('express');
var passport = require('passport');
var ProcessonStrategy = require('passport-processon').Strategy;

var PROCESSON_CLIENT_ID = '--insert-github-client-id-here--';
var PROCESSON_CLIENT_SECRET = '--insert-github-client-secret-here--';

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new ProcessonStrategy({
    clientID: PROCESSON_CLIENT_ID,
    clientSecret: PROCESSON_CLIENT_SECRET,
    callbackURL: 'http://example.com/oauth2/processon/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(accessToken, profile)
    return done(null, profile);
  }
));

var app = express();
app.use(passport.initialize());
// app.use(passport.session());

app.get('/oauth2/processon/callback',
  passport.authenticate('processon'),
  function(req, res) {
    res.json(req.user);
  });

app.listen(80, function() {
  console.log('listening ...');
});
