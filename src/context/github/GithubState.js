import React, { useReducer } from "react";
import axois from "axios";
import gitHubContext from "./gitHubContext";
import gitHubReducer from "./gitHubReducer";
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS,
} from "../types";

let githubClientId;
let githubClientSecret;

if (process.env.NODE_ENV !== "production") {
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
  githubClientId = process.env.GITHUB_CLIENT_ID;
  githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

const GithubState = (props) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispach] = useReducer(gitHubReducer, initialState);

  //search github users
  const searchUsers = async (text) => {
    setLoading();
    const res = await axois.get(
      `https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&client_secret=${githubClientSecret}`
    );
    dispach({ type: SEARCH_USERS, payload: res.data.items });
  };

  //get single github user
  const getUser = async (username) => {
    setLoading();
    const res = await axois.get(
      `https://api.github.com/users/${username}?client_id=${githubClientId}&client_secret=${githubClientSecret}`
    );
    dispach({ type: GET_USER, payload: res.data });
  };

  //get user's repos
  const getUserRepos = async (username) => {
    setLoading();
    const res = await axois.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:desc&client_id=${githubClientId}&client_secret=${githubClientSecret}`
    );
    dispach({ type: GET_REPOS, payload: res.data });
  };

  //clear users from state
  const clearUsers = () => {
    dispach({ type: CLEAR_USERS });
  };

  //set loading
  const setLoading = () => {
    dispach({ type: SET_LOADING });
  };

  return (
    <gitHubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {props.children}
    </gitHubContext.Provider>
  );
};

export default GithubState;
