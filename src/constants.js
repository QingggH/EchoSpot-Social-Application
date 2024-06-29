export const LOGIN_STATUS = {
  PENDING: "pending",
  NOT_LOGGED_IN: "notLoggedIn",
  IS_LOGGED_IN: "loggedIn",
};

export const CURRENT_PAGE = {
  LOGIN_PAGE: "loginPage",
  PROFILE_PAGE: "profilePage",
  HOME_PAGE: "homePage",
  SEARCH_PAGE: "searchpage",
};

export const SERVER = {
  AUTH_MISSING: "auth-missing",
  AUTH_INSUFFICIENT: "auth-insufficient",
  REQUIRED_USERNAME: "required-username",
  REQUIRED_SEARCH_TEXT: "required-search-text",
  REQUIRED_FOLLOWEE_TO_FOLLOW: "required-followee-to-follow",
  REQUIRED_FOLLOWEE_TO_ADD_FOLLOWER: "required-followee-to-add-follower",
  REQUIRED_POST: "required-post",
  INVALID_POST_LENGTH: "invalid-post-length",
  REQUIRED_REPLY: "required-reply",
  INVALID_REPLY_LENGTH: "invalid-reply-length",
  REQUIRED_POST_ID: "required-postId",
  REQUIRED_USERNAME_FOR_REPLY: "required-username-for-reply",
};

export const CLIENT = {
  NETWORK_ERROR: "networkError",
  NO_SESSION: "noSession",
  UNKNOWN_ACTION: "unknownAction",
};

export const MESSAGES = {
  [CLIENT.NETWORK_ERROR]: "Server unavailable. Please retry.",
  [SERVER.REQUIRED_USERNAME]: "Invalid Username. Use only letters and numbers.",
  [SERVER.AUTH_INSUFFICIENT]: "Dog is invalid username.",
  [SERVER.AUTH_MISSING]: "User is not Logged in.",
  [SERVER.REQUIRED_SEARCH_TEXT]: "Search input cannot be empty.",
  [SERVER.REQUIRED_FOLLOWEE_TO_FOLLOW]: "Specify user to follow.",
  [SERVER.REQUIRED_FOLLOWEE_TO_ADD_FOLLOWER]:
    "Specify user to add as follower.",
  [SERVER.REQUIRED_POST]: "Invalid post. Content cannot be empty.",
  [SERVER.INVALID_POST_LENGTH]: "Post too long. Max 140 characters.",
  [SERVER.REQUIRED_REPLY]: "Reply cannot be empty.",
  [SERVER.INVALID_REPLY_LENGTH]: "Reply too long. Max 140 characters.",
  [SERVER.REQUIRED_POST_ID]: "Post ID required to reply.",
  [SERVER.REQUIRED_USERNAME_FOR_REPLY]: "Username required for reply.",
  default: "Something went very wrong, please try again",
};

export const ACTIONS = {
  LOG_IN: "logIn",
  LOG_OUT: "logOut",
  REPORT_ERROR: "reportError",
  START_LOADING_FEED: "startLoadingFeed",
  REPLACE_FEED: "replaceFeed",
  REPLACE_PROFILE_FEED: "replaceProfileFeed",
  NAVIGATE_TO_SEARCH_PAGE: "navigateToSearchPage",
  START_LOADING_SEARCHED_USERS: "startLoadingSearchedUser",
  REPLACE_SEARCHED_USERS: "replaceSearchedUser",
  NAVIGATE_TO_HOME_PAGE: "navigateToHomePage",
  REPLACE_SEARCH_TEXT: "replaceSearchText",
  NAVIGATE_TO_PROFILE_PAGE: "navigateToProfilePage",
  START_LOADING_PROFILE_FEED: "startLoadingProfileFeed",
  START_LOADING_FOLLOWEES: "startLoadingFollowees",
  REPLACE_FOLLOWEES: "replaceFollowees",
};

export const BUTTON_NAMES = {
  MY_PROFILE: "myProfile",
  SEARCH_USER: "searchUser",
  HOME_PAGE: "homePage",
};
