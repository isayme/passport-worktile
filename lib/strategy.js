var util = require('util');
var OAuth2Strategy = require('passport-oauth2');
var InternalOAuthError = require('passport-oauth2').InternalOAuthError;
var Profile = require('./profile');

/**
 * `Strategy` constructor.
 *
 * The worktile authentication strategy authenticates requests by delegating to
 * worktile using the OAuth 2.0 protocol.
 *
 * Applications must supply a `verify` callback which accepts an `accessToken`,
 * `refreshToken` and service-specific `profile`, and then calls the `done`
 * callback supplying a `user`, which should be set to `false` if the
 * credentials are not valid.  If an exception occured, `err` should be set.
 *
 * Options:
 *   - `clientID`      your worktile application's Client ID
 *   - `clientSecret`  your worktile application's Client Secret
 *   - `callbackURL`   URL to which worktile will redirect the user after granting authorization
 *
 * Examples:
 *
 *     passport.use(new rocessonStrategy({
 *         clientID: '123-456-789',
 *         clientSecret: 'shhh-its-a-secret',
 *         callbackURL: 'https://www.example.net/auth/worktile/callback'
 *       },
 *       function(accessToken, refreshToken, profile, done) {
 *         User.findOrCreate(..., function (err, user) {
 *           done(err, user);
 *         });
 *       }
 *     ));
 *
 * @param {Object} options
 * @param {Function} verify
 * @api public
 */
function Strategy(options, verify) {
  options = options || {};
  options.authorizationURL = options.authorizationURL || 'https://open.worktile.com/oauth2/authorize';
  options.tokenURL = options.tokenURL || 'https://api.worktile.com/oauth2/access_token';
  options.scopeSeparator = options.scopeSeparator || ',';

  OAuth2Strategy.call(this, options, verify);
  this.name = 'worktile';
  this._userProfileURL = options.userProfileURL || 'https://api.worktile.com/v1/user/profile';
}

/**
 * Inherit from `OAuth2Strategy`.
 */
util.inherits(Strategy, OAuth2Strategy);


/**
 * Retrieve user profile from Worktile.
 *
 * This function constructs a normalized profile, with the following properties:
 *
 *   - `provider`         always set to `worktile`
 *   - `id`               the user's worktile ID
 *   - `displayName`      the user's full name
 *   - `profileUrl`       the URL of the profile for the user on worktile
 *   - `photoUrl`         the user's photo url
 *   - `emails`           the user's email addresses
 *
 * @param {String} accessToken
 * @param {Function} done
 * @api protected
 */
Strategy.prototype.userProfile = function(accessToken, done) {
  this._oauth2.get(this._userProfileURL, accessToken, function (err, body, res) {
    var json;

    if (err) {
      return done(new InternalOAuthError('Failed to fetch user profile', err));
    }

    try {
      json = JSON.parse(body);
    } catch (ex) {
      return done(new Error('Failed to parse user profile'));
    }

    var profile = Profile.parse(json);
    profile.provider  = 'worktile';
    profile._raw = body;
    profile._json = json;

    done(null, profile);
  });
}

/**
 * Expose `Strategy`.
 */
module.exports = Strategy;
