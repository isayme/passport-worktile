# Passport-Worktile

[Passport](http://passportjs.org/) strategy for authenticating with [Worktile](https://www.worktile.com/)
using the OAuth 2.0 API.

## Install

    $ npm install passport-worktile

## Usage

#### Configure Strategy

The Worktile authentication strategy authenticates users using a Worktile account
and OAuth 2.0 tokens.  The strategy requires a `verify` callback, which accepts
these credentials and calls `done` providing a user, as well as `options`
specifying a client ID, client secret, and callback URL.

    passport.use(new WorktileStrategy({
        clientID: WORKTILE_CLIENT_ID,
        clientSecret: WORKTILE_CLIENT_SECRET,
        callbackURL: "http://127.0.0.1:3000/auth/worktile/callback"
      },
      function(accessToken, refreshToken, profile, done) {
        User.findOrCreate({ worktileId: profile.id }, function (err, user) {
          return done(err, user);
        });
      }
    ));

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'worktile'` strategy, to
authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

    app.get('/auth/worktile',
      passport.authenticate('worktile'));

    app.get('/auth/worktile/callback',
      passport.authenticate('worktile', { failureRedirect: '/login' }),
      function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
      });

## Examples

For a complete, working example, refer to the [example](https://github.com/isayme/passport-worktile/tree/master/example/).

## Tests

    $ npm install --dev
    $ npm test
