const uuid = require("uuid").v4;

function makeFollowerList() {
  const followerList = {};
  const followers = {};

  followerList.getFollowers = function getFollowers() {
    return followers;
  };

  followerList.getFollower = function getFollower(id) {
    return followers[id];
  };

  followerList.addFollower = function addFollower(follower) {
    const id = uuid();
    followers[id] = follower;
    return id;
  };

  followerList.findFollower = function findFollower(follower) {
    return Object.keys(followers).find((key) => followers[key] === follower);
  };

  followerList.deleteFollower = function deleteFollower(id) {
    delete followers[id];
  };

  return followerList;
}

module.exports = {
  makeFollowerList,
};
