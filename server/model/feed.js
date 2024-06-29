const users = require("./users");
const { KEYS } = require("../util/constants");

function generateProfileFeed(username) {
  const userData = users.getUserData(username);
  const posts = userData[KEYS.POSTS_KEY].getPosts();
  const profileFeed = generateFeedFromPosts(posts, username);
  profileFeed.sort((a, b) => b.postTime - a.postTime);
  return convertPostTimeInFeedToString(profileFeed);
}

function generateUserHomePageFeed(username) {
  const existingUserData = users.getUserData(username);
  const followees = existingUserData[KEYS.FOLLOWEES_KEY].getFollowees();
  const userFeed = [];
  Object.values(followees).map((followee) => {
    const followeeData = users.getUserData(followee);
    const posts = followeeData[KEYS.POSTS_KEY].getPosts();
    userFeed.push(...generateFeedFromPosts(posts, followee));
  });
  const existingUserPosts = existingUserData[KEYS.POSTS_KEY].getPosts();
  userFeed.push(...generateFeedFromPosts(existingUserPosts, username));
  userFeed.sort((a, b) => b.postTime - a.postTime);
  return convertPostTimeInFeedToString(userFeed);
}

function generateFeedFromPosts(posts, username) {
  const feed = [];
  for (const [key, value] of Object.entries(posts)) {
    const replyList = value[KEYS.REPLIES_KEY];
    const complexReplies = replyList.getReplies();
    const simpleReplies = Object.values(complexReplies);
    const repliesWithTimeConverted = simpleReplies.map((reply) => {
      const replyTime = reply[KEYS.REPLY_TIME_KEY];
      reply[KEYS.REPLY_TIME_KEY] = convertDateToString(replyTime);
      return reply;
    });

    const simplePost = {
      id: key,
      username: username,
      post: value[KEYS.POST_KEY],
      postTime: value[KEYS.POST_TIME_KEY],
      replies: repliesWithTimeConverted,
    };
    feed.push(simplePost);
  }
  return feed;
}

function convertPostTimeInFeedToString(feed) {
  feed.forEach(function (post, index) {
    const postTimeString = convertDateToString(post.postTime);
    post.postTime = postTimeString;
    feed[index] = post;
  });
  return feed;
}

function convertDateToString(date) {
  const stringDate = new Date(date);
  const dd = String(stringDate.getDate()).padStart(2, "0");
  const mm = String(stringDate.getMonth() + 1).padStart(2, "0");
  const yyyy = stringDate.getFullYear();
  const hours = String(stringDate.getHours()).padStart(2, "0");
  const minutes = String(stringDate.getMinutes()).padStart(2, "0");

  const textDate = mm + "-" + dd + "-" + yyyy + " " + hours + ":" + minutes;
  return textDate;
}

module.exports = {
  generateProfileFeed,
  generateUserHomePageFeed,
};
