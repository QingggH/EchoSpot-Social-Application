import { useEffect, useReducer } from "react";
import "./App.css";
import reducer, { initialState } from "./reducer";

import {
  LOGIN_STATUS,
  SERVER,
  CLIENT,
  ACTIONS,
  CURRENT_PAGE,
  BUTTON_NAMES,
} from "./constants";

import {
  fetchSession,
  fetchLogin,
  fetchLogout,
  fetchFeed,
  fetchSearchUser,
  fetchAddFollowee,
  fetchAddFollower,
  fetchDeleteFollowee,
  fetchDeleteFollower,
  fetchAddPost,
  fetchProfileFeed,
  fetchAddReply,
  fetchFollowees,
  fetchDeletePost,
} from "./services/services";

import Status from "./components/common/Status";
import Loading from "./components/common/Loading";
import LoginForm from "./components/login/LoginForm";
import HomePage from "./components/home/HomePage";
import SearchPage from "./components/search/SearchPage";
import ProfilePage from "./components/profile/ProfilePage";
import Header from "./components/common/Header";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function onLogin(username) {
    fetchLogin(username)
      .then((user) => {
        dispatch({ type: ACTIONS.LOG_IN, username: user.username });
        dispatch({ type: ACTIONS.START_LOADING_FEED });
        return fetchFeed();
      })
      .then((feed) => {
        dispatch({ type: ACTIONS.REPLACE_FEED, feed });
      })
      .catch((err) => {
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
      });
  }

  function onLogout() {
    dispatch({ type: ACTIONS.LOG_OUT });
    fetchLogout().catch((err) => {
      dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
    });
  }

  function onSearchUser(searchText) {
    dispatch({ type: ACTIONS.START_LOADING_SEARCHED_USERS });
    fetchSearchUser(searchText)
      .then((searchedUsers) => {
        dispatch({ type: ACTIONS.REPLACE_SEARCH_TEXT, searchText });
        dispatch({ type: ACTIONS.REPLACE_SEARCHED_USERS, searchedUsers });
      })
      .catch((err) => {
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
      });
  }

  function onAddFollowee(followee) {
    fetchAddFollowee(followee)
      .then((followee) => {
        return fetchAddFollower(followee);
      })
      .then(() => {
        onSearchUser(state.searchText);
      })
      .catch((err) => {
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
      });
  }

  function onDeleteFollowee(id) {
    fetchDeleteFollowee(id)
      .then((response) => {
        return fetchDeleteFollower(response.followee);
      })
      .then(() => {
        onSearchUser(state.searchText);
      })
      .catch((err) => {
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
      });
  }

  function onAddPost(post) {
    fetchAddPost(post)
      .then(() => {
        dispatch({ type: ACTIONS.START_LOADING_PROFILE_FEED });
        return fetchProfileFeed();
      })
      .then((profileFeed) => {
        dispatch({
          type: ACTIONS.REPLACE_PROFILE_FEED,
          profileFeed: profileFeed,
        });
      })
      .catch((err) => {
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
      });
  }

  function onAddReply(postId, username, reply) {
    fetchAddReply(postId, username, reply)
      .then(() => {
        dispatch({ type: ACTIONS.START_LOADING_FEED });
        return fetchFeed();
      })
      .then((feed) => {
        dispatch({ type: ACTIONS.REPLACE_FEED, feed });
      })
      .catch((err) => {
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
      });
  }

  function onDeleteFolloweeFromProfilePage(id) {
    fetchDeleteFollowee(id)
      .then((response) => {
        return fetchDeleteFollower(response.followee);
      })
      .then(() => {
        dispatch({ type: ACTIONS.START_LOADING_FOLLOWEES });
        return fetchFollowees();
      })
      .then((followees) => {
        dispatch({ type: ACTIONS.REPLACE_FOLLOWEES, followees });
      })
      .catch((err) => {
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
      });
  }

  function onDeletePost(id) {
    fetchDeletePost(id)
      .then(() => {
        dispatch({ type: ACTIONS.START_LOADING_PROFILE_FEED });
        return fetchProfileFeed();
      })
      .then((profileFeed) => {
        dispatch({ type: ACTIONS.REPLACE_PROFILE_FEED, profileFeed });
        dispatch({ type: ACTIONS.START_LOADING_FOLLOWEES });
      })
      .catch((err) => {
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
      });
  }

  function onNavigationButtonClick(value) {
    fetchSession()
      .then(() => {
        if (value === BUTTON_NAMES.SEARCH_USER) {
          dispatch({ type: ACTIONS.NAVIGATE_TO_SEARCH_PAGE });
        } else if (value === BUTTON_NAMES.HOME_PAGE) {
          dispatch({ type: ACTIONS.NAVIGATE_TO_HOME_PAGE });
        } else if (value === BUTTON_NAMES.MY_PROFILE) {
          dispatch({ type: ACTIONS.NAVIGATE_TO_PROFILE_PAGE });
        }
        dispatch({ type: ACTIONS.START_LOADING_FEED });
        return fetchFeed();
      })
      .catch((err) => {
        if (err?.error === SERVER.AUTH_MISSING) {
          return Promise.reject({ error: CLIENT.NO_SESSION });
        }
        return Promise.reject(err);
      })
      .then((feed) => {
        dispatch({ type: ACTIONS.REPLACE_FEED, feed });
        dispatch({ type: ACTIONS.START_LOADING_PROFILE_FEED });
        return fetchProfileFeed();
      })
      .then((profileFeed) => {
        dispatch({ type: ACTIONS.REPLACE_PROFILE_FEED, profileFeed });
        dispatch({ type: ACTIONS.START_LOADING_FOLLOWEES });
        return fetchFollowees();
      })
      .then((followees) => {
        dispatch({ type: ACTIONS.REPLACE_FOLLOWEES, followees });
      })
      .catch((err) => {
        if (err?.error === CLIENT.NO_SESSION) {
          dispatch({ type: ACTIONS.LOG_OUT });
          return;
        }
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
      });
  }

  function checkForSession() {
    fetchSession()
      .then((session) => {
        dispatch({ type: ACTIONS.LOG_IN, username: session.username });
        dispatch({ type: ACTIONS.START_LOADING_FEED });
        return fetchFeed();
      })
      .catch((err) => {
        if (err?.error === SERVER.AUTH_MISSING) {
          return Promise.reject({ error: CLIENT.NO_SESSION });
        }
        return Promise.reject(err);
      })
      .then((feed) => {
        dispatch({ type: ACTIONS.REPLACE_FEED, feed });
      })
      .catch((err) => {
        if (err?.error === CLIENT.NO_SESSION) {
          dispatch({ type: ACTIONS.LOG_OUT });
          return;
        }
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
      });
  }

  useEffect(() => {
    checkForSession();
  }, []);

  return (
    <div className="app">
      {state.currentPage !== CURRENT_PAGE.LOGIN_PAGE && (
        <Header
          onLogout={onLogout}
          onNavigationButtonClick={onNavigationButtonClick}
        />
      )}
      {state.error && <Status error={state.error} />}
      {state.loginStatus === LOGIN_STATUS.PENDING && (
        <Loading className="login__waiting">Loading user...</Loading>
      )}
      {state.loginStatus === LOGIN_STATUS.NOT_LOGGED_IN &&
        state.currentPage === CURRENT_PAGE.LOGIN_PAGE && (
          <LoginForm onLogin={onLogin} />
        )}
      {state.loginStatus === LOGIN_STATUS.IS_LOGGED_IN &&
        state.currentPage === CURRENT_PAGE.HOME_PAGE && (
          <HomePage
            onAddReply={onAddReply}
            username={state.username}
            isFeedPending={state.isFeedPending}
            feed={state.feed}
          />
        )}
      {state.loginStatus === LOGIN_STATUS.IS_LOGGED_IN &&
        state.currentPage === CURRENT_PAGE.SEARCH_PAGE && (
          <SearchPage
            onSearchUser={onSearchUser}
            searchedUsers={state.searchedUsers}
            isSearchedUsersPending={state.isSearchedUsersPending}
            onDeleteFollowee={onDeleteFollowee}
            onAddFollowee={onAddFollowee}
          />
        )}
      {state.loginStatus === LOGIN_STATUS.IS_LOGGED_IN &&
        state.currentPage === CURRENT_PAGE.PROFILE_PAGE && (
          <ProfilePage
            onAddPost={onAddPost}
            onDeleteFolloweeFromProfilePage={onDeleteFolloweeFromProfilePage}
            onDeletePost={onDeletePost}
            username={state.username}
            isProfileFeedPending={state.isProfileFeedPending}
            profileFeed={state.profileFeed}
            followees={state.followees}
          />
        )}
    </div>
  );
}

export default App;
