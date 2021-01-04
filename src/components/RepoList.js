import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_REPOS } from '../graphql/queries';
import Repo from './Repo';

const RepoList = ({ showAllRepos, direction, showAllDelete }) => {
  const username = process.env.REACT_APP_GITHUB_USER;
  const { loading, error, refetch, data } = useQuery(GET_REPOS, {
    variables: { login: username, direction },
  });
  if (error) return { error };
  if (loading) return <h1>Loading...</h1>;

  const allRepos = data.user.repositories.edges;
  const forkedRepos = allRepos.filter((repo) => repo.node.isFork === true);
  const reposToShow = showAllRepos ? allRepos : forkedRepos;
  return (
    <ul>
      {reposToShow.map((repo) => {
        return (
          <Repo
            repo={repo}
            refetch={refetch}
            key={repo.cursor}
            showAllDelete={showAllDelete}
          />
        );
      })}
    </ul>
  );
};

export default RepoList;
