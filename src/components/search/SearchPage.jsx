import { useState } from "react";
import Loading from "../common/Loading";
import "./SearchPage.css";

function SearchPage({
  onSearchUser,
  searchedUsers,
  isSearchedUsersPending,
  onDeleteFollowee,
  onAddFollowee,
}) {
  const [searchText, setSearchText] = useState("");
  const [searchCompleted, setSearchCompleted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    onSearchUser(searchText);
    setSearchText("");
    setSearchCompleted(true);
  }

  function handleChange(event) {
    setSearchText(event.target.value);
  }

  const SHOW = {
    PENDING: "pending",
    EMPTY: "empty",
    SEARCHED_USERS: "searchedUsers",
  };

  let show;
  if (isSearchedUsersPending) {
    show = SHOW.PENDING;
  } else if (searchCompleted && !searchedUsers.length) {
    show = SHOW.EMPTY;
  } else {
    show = SHOW.SEARCHED_USERS;
  }

  return (
    <div className="search-container">
      <div className="search">
        {show === SHOW.PENDING && (
          <Loading className="feed-waiting">Loading Search Results...</Loading>
        )}
        <form className="search-form-container" onSubmit={handleSubmit}>
          <div className="search-form">
            <input
              className="search-input"
              type="text"
              value={searchText}
              onChange={handleChange}
              placeholder="Search users"
            />
            <button className="search-btn" type="submit">
              Search
            </button>
          </div>
        </form>
        {show === SHOW.EMPTY && <p className="search-text">No users found!</p>}
        {searchedUsers.map((result, index) => (
          <div key={index} className="user-list-container">
            <div className="user-list">
              <div className="result-username">{result.username}</div>
              <div className="follow-btn">
                {result.follow && (
                  <button
                    value={result.id}
                    onClick={(e) => onDeleteFollowee(e.target.value)}
                  >
                    Unfollow
                  </button>
                )}
                {!result.follow && (
                  <button
                    value={result.username}
                    onClick={(e) => onAddFollowee(e.target.value)}
                  >
                    Follow
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchPage;
