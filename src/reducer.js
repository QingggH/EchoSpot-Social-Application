import { LOGIN_STATUS, CLIENT, ACTIONS, CURRENT_PAGE } from "./constants";
export const initialState = {
  error: "",
  username: "",
  loginStatus: LOGIN_STATUS.PENDING,
  currentPage: CURRENT_PAGE.LOGIN_PAGE,
  isFeedPending: false,
  feed: [],
  isProfileFeedPending: false,
  profileFeed: [],
  searchText: "",
  isSearchedUsersPending: false,
  searchedUsers: [],
  isFolloweesPending: false,
  followees: {},
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.LOG_IN:
      return {
        ...state,
        error: "",
        loginStatus: LOGIN_STATUS.IS_LOGGED_IN,
        currentPage: CURRENT_PAGE.HOME_PAGE,
        username: action.username,
      };

    case ACTIONS.LOG_OUT:
      return {
        ...state,
        error: "",
        username: "",
        loginStatus: LOGIN_STATUS.NOT_LOGGED_IN,
        currentPage: CURRENT_PAGE.LOGIN_PAGE,
        isFeedPending: false,
        feed: [],
        isProfileFeedPending: false,
        profileFeed: [],
        searchText: "",
        isSearchedUsersPending: false,
        searchedUsers: [],
        isFolloweesPending: false,
        followees: {},
      };

    case ACTIONS.REPORT_ERROR:
      return {
        ...state,
        error: action.error || "ERROR",
        isFeedPending: false,
        isProfileFeedPending: false,
        isSearchedUsersPending: false,
      };

    case ACTIONS.START_LOADING_FEED:
      return {
        ...state,
        error: "",
        isFeedPending: true,
      };

    case ACTIONS.REPLACE_FEED:
      return {
        ...state,
        error: "",
        isFeedPending: false,
        feed: action.feed,
      };

    case ACTIONS.START_LOADING_PROFILE_FEED:
      return {
        ...state,
        error: "",
        isProfileFeedPending: true,
      };

    case ACTIONS.REPLACE_PROFILE_FEED:
      return {
        ...state,
        error: "",
        isProfileFeedPending: false,
        profileFeed: action.profileFeed,
      };

    case ACTIONS.START_LOADING_SEARCHED_USERS:
      return {
        ...state,
        error: "",
        isSearchedUsersPending: true,
      };

    case ACTIONS.REPLACE_SEARCHED_USERS:
      return {
        ...state,
        error: "",
        isSearchedUsersPending: false,
        searchedUsers: action.searchedUsers,
      };

    case ACTIONS.REPLACE_SEARCH_TEXT:
      return {
        ...state,
        error: "",
        searchText: action.searchText,
      };

    case ACTIONS.NAVIGATE_TO_SEARCH_PAGE:
      return {
        ...state,
        error: "",
        currentPage: CURRENT_PAGE.SEARCH_PAGE,
        searchedUsers: [],
      };

    case ACTIONS.NAVIGATE_TO_HOME_PAGE:
      return {
        ...state,
        error: "",
        currentPage: CURRENT_PAGE.HOME_PAGE,
      };

    case ACTIONS.NAVIGATE_TO_PROFILE_PAGE:
      return {
        ...state,
        error: "",
        currentPage: CURRENT_PAGE.PROFILE_PAGE,
      };

    case ACTIONS.START_LOADING_FOLLOWEES:
      return {
        ...state,
        error: "",
        isFolloweesPending: true,
      };

    case ACTIONS.REPLACE_FOLLOWEES:
      return {
        ...state,
        error: "",
        isFolloweesPending: false,
        followees: action.followees,
      };

    default:
      throw new Error({ error: CLIENT.UNKNOWN_ACTION, detail: action });
  }
}

export default reducer;
