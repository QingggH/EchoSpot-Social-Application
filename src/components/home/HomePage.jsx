import { useState } from "react";
import Loading from "../common/Loading";
import "./HomePage.css";

function HomePage({ onAddReply, isFeedPending, feed }) {
  const [replies, setReplies] = useState({});

  function handleSubmit(event) {
    event.preventDefault();
    const postId = event.target.dataset.id;
    const username = event.target.dataset.username;
    const reply = replies[postId];
    onAddReply(postId, username, reply);
    setReplies((prev) => {
      return { ...prev, [postId]: "" };
    });
  }

  function handleChange(event) {
    setReplies((prev) => {
      return { ...prev, [event.target.dataset.id]: event.target.value };
    });
  }

  const SHOW = {
    PENDING: "pending",
    EMPTY: "empty",
    FEED: "feed",
  };

  let show;
  if (isFeedPending) {
    show = SHOW.PENDING;
  } else if (!feed.length) {
    show = SHOW.EMPTY;
  } else {
    show = SHOW.FEED;
  }

  return (
    <div className="home-container">
      {show === SHOW.PENDING && (
        <Loading className="feed__waiting">Loading...</Loading>
      )}
      <div className="home-content">
        {show === SHOW.EMPTY && (
          <p className="feed-text">Go post or follow users!</p>
        )}

        {Object.values(feed)?.map((post, postIndex) => {
          return (
            <div key={post.id} className="single-post">
              <div className="post-container" key={postIndex}>
                <div className="post-user">{post.username}</div>
                <div className="post-content">{post.post}</div>
                <div className="post-time">{post.postTime}</div>
              </div>
              {post.replies?.map((reply, replyIndex) => {
                return (
                  <div className="reply-container" key={replyIndex}>
                    <div className="reply-user">{reply.username}</div>
                    <div className="reply-content">{reply.reply}</div>
                    <div className="reply-time">{reply.replyTime}</div>
                  </div>
                );
              })}
              <form
                className="post-details"
                data-id={post.id}
                data-username={post.username}
                onSubmit={handleSubmit}
              >
                <input
                  className="reply-area"
                  data-id={post.id}
                  type="textarea"
                  placeholder="Write your reply here"
                  value={replies[post.id] || ""}
                  onChange={handleChange}
                />
                <button className="reply-btn" type="submit">
                  Reply
                </button>
              </form>
              <hr />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HomePage;
