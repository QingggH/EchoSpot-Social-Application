const uuid = require("uuid").v4;

const { KEYS } = require("../util/constants");
const replies = require("./replies");

function makePostList() {
  const postList = {};
  const posts = {};

  postList.getPosts = function getPosts() {
    return posts;
  };

  postList.getPost = function getPost(id) {
    return posts[id];
  };

  postList.contains = function contains(id) {
    return !!posts[id];
  };

  postList.deletePost = function deletePost(id) {
    delete posts[id];
  };

  postList.addPost = function addPost(post) {
    const id = uuid();
    const postTime = Date.now();
    const postDetails = {
      [KEYS.POST_KEY]: post,
      [KEYS.POST_TIME_KEY]: postTime,
      [KEYS.REPLIES_KEY]: replies.makeReplyList(),
    };
    posts[id] = postDetails;
    return id;
  };

  return postList;
}

module.exports = {
  makePostList,
};
