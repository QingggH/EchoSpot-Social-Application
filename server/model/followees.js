const uuid = require("uuid").v4;

function makeFolloweeList() {
  const followeeList = {};
  const followees = {};

  followeeList.getFollowees = function getFollowees() {
    return followees;
  };

  followeeList.getFollowee = function getFollowee(id) {
    return followees[id];
  };

  followeeList.addFollowee = function addFollowee(followee) {
    const id = uuid();
    followees[id] = followee;
    return id;
  };

  followeeList.contains = function contains(id) {
    return !!followees[id];
  };

  followeeList.deleteFollowee = function deleteFollowee(id) {
    delete followees[id];
  };

  return followeeList;
}

module.exports = {
  makeFolloweeList,
};
