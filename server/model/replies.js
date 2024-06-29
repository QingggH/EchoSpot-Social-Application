const { KEYS } = require("../util/constants");

const uuid = require("uuid").v4;

function makeReplyList() {
  const replyList = {};
  const replies = {};

  replyList.getReplies = function getReplies() {
    return replies;
  };

  replyList.addReply = function addReply(reply, username) {
    const id = uuid();
    const replyTime = Date.now();
    const replyDetails = {
      [KEYS.REPLY_KEY]: reply,
      [KEYS.REPLY_TIME_KEY]: replyTime,
      [KEYS.REPLY_USERNAME]: username,
    };
    replies[id] = replyDetails;
    return id;
  };

  return replyList;
}

module.exports = {
  makeReplyList,
};
