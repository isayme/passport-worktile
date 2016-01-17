exports.parse = function(json) {
  var profile = {};
  var data = json.data || {};
  profile.id = data._id;
  profile.displayName = data.fullName;
  profile.profileUrl = data.profileUrl;
  profile.photoUrl = data.photoUrl;
  if (data.photoUrl) {
    profile.photos = [data.photoUrl];
  }
  if (data.email) {
    profile.emails = [{value: data.email}];
  }

  return profile;
};
