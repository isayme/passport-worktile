exports.parse = function(json) {
  var profile = {};
  var data = json || {};
  profile.id = data.uid;
  profile.name = data.name;
  profile.displayName = data.display_name;
  profile.photoUrl = data.avatar;

  profile.photos = [];
  if (data.avatar) {
    profile.photos.push(data.avatar);
  }
  if (data.email) {
    profile.emails = [{value: data.email}];
  }

  return profile;
};
