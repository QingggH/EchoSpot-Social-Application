import { useState } from "react";
import Loading from "../common/Loading";
import "./ProfilePage.css";

function ProfilePage({
  onAddPost,
  username,
  onDeleteFolloweeFromProfilePage,
  isProfileFeedPending,
  profileFeed,
  followees,
  onDeletePost,
}) {
  const [post, setPost] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onAddPost(post);
    setPost("");
  }

  function handleChange(event) {
    setPost(event.target.value);
  }

  const SHOW = {
    PENDING: "pending",
    EMPTY: "empty",
    PROFILE_FEED: "profilFeed",
  };

  let show;
  if (isProfileFeedPending) {
    show = SHOW.PENDING;
  } else if (!profileFeed.length) {
    show = SHOW.EMPTY;
  } else {
    show = SHOW.PROFILE_FEED;
  }

  return (
    <div className="profile-page">
      {show === SHOW.PENDING && (
        <Loading className="Post-waiting">Loading Profile...</Loading>
      )}
      <div className="profile-top">
        <div className="profile-top-container">
          <div className="profile-title">{username}'s Profile</div>
          <form className="post-form" onSubmit={handleSubmit}>
            <input
              className="post-input"
              type="text"
              value={post}
              onChange={handleChange}
              placeholder="Post here !"
            />
            <button className="post-btn" type="submit">
              Post
            </button>
          </form>
        </div>
      </div>
      <div className="profile-container">
        <div className="profile-left">
          {show === SHOW.EMPTY && <p className="feed-text">Empty here</p>}

          {Object.values(profileFeed)?.map((feed, feedIndex) => {
            return (
              <div className="single-detail" key={feed.id}>
                <div className="profile-detail" key={feedIndex}>
                  <div className="feed-username">
                    {username}
                    <button
                      value={feed.id}
                      onClick={(e) => onDeletePost(e.target.value)}
                      className="delete-btn"
                    >
                      Delete Post
                    </button>
                  </div>
                  <div className="feed-post">{feed.post}</div>
                  <div className="feed-posttime"> {feed.postTime}</div>
                </div>
                {feed.replies?.map((reply, replyIndex) => {
                  return (
                    <div className="pro-reply-container" key={replyIndex}>
                      <div className="pro-reply-user">{reply.username} </div>
                      <div className="pro-reply-content">{reply.reply} </div>
                      <div className="pro-reply-time">{reply.replyTime}</div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div className="profile-right">
          <div className="profile-right-container">
            <div className="followees-title">Followees</div>
            <div className="followees-users">
              {Object.keys(followees).length === 0 && (
                <p className="feed-text">You are not following any user</p>
              )}
              {Object.keys(followees)?.map((followeeId, index) => {
                return (
                  <div key={index}>
                    <div className="user-label">{followees[followeeId]}</div>
                    <button
                      value={followeeId}
                      onClick={(e) =>
                        onDeleteFolloweeFromProfilePage(e.target.value)
                      }
                      className="unfollow-btn"
                    >
                      Unfollow
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
