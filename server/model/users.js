const { KEYS } = require("../util/constants");

const users = {};

function isValidUsername(username) {
  let isValid = true;
  isValid = isValid && username && username.trim();
  isValid = isValid && username.match(/^[A-Za-z0-9_]+$/);
  return isValid;
}

function addUserData(username, userData) {
  users[username] = userData;
}

function getUserData(username) {
  return users[username];
}

function searchUsers(username, searchText) {
  const searchResult = [];
  const result = Object.keys(users).filter(
    (usr) =>
      usr.toLowerCase().includes(searchText.toLowerCase()) && usr !== username
  );
  const existingUserData = getUserData(username);
  const followees = existingUserData[KEYS.FOLLOWEES_KEY].getFollowees();
  const followeesList = Object.values(followees);

  result.forEach((username) => {
    if (followeesList.includes(username)) {
      const id = getKeyByValue(followees, username);
      searchResult.push({
        username,
        follow: followeesList.includes(username),
        id,
      });
    } else {
      searchResult.push({ username, follow: followeesList.includes(username) });
    }
  });
  return searchResult;
}

function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}

module.exports = {
  isValidUsername,
  getUserData,
  addUserData,
  searchUsers,
};
