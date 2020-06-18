import React, { useContext } from "react";
import PropTypes from "prop-types";
import RepoItem from "./RepoItem";
import GithubContext from "../../context/github/gitHubContext";

const Repos = () => {
  const gitHubContext = useContext(GithubContext);
  const { repos } = gitHubContext;
  return repos.map((repo) => <RepoItem repo={repo} key={repo.id} />);
};

Repos.propTypes = {
  repos: PropTypes.array.isRequired,
};

export default Repos;
