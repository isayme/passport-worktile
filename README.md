# Passport-Processon

[Passport](http://passportjs.org/) strategy for authenticating with [Processon](https://www.processon.com/)
using the OAuth 2.0 API.

## Install

    $ npm install passport-processon

## Usage

#### Configure Strategy

The Processon authentication strategy authenticates users using a Processon account
and OAuth 2.0 tokens.  The strategy requires a `verify` callback, which accepts
these credentials and calls `done` providing a user, as well as `options`
specifying a client ID, client secret, and callback URL.

    passport.use(new ProcessonStrategy({
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: "http://127.0.0.1:3000/auth/processon/callback"
      },
      function(accessToken, refreshToken, profile, done) {
        User.findOrCreate({ processonId: profile.id }, function (err, user) {
          return done(err, user);
        });
      }
    ));

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'processon'` strategy, to
authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

    app.get('/auth/processon',
      passport.authenticate('processon'));

    app.get('/auth/processon/callback',
      passport.authenticate('processon', { failureRedirect: '/login' }),
      function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
      });

## Examples

For a complete, working example, refer to the [example](https://github.com/isayme/passport-processon/tree/master/example/).

## Tests

    $ npm install --dev
    $ npm test
