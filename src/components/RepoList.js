import React from 'react';
import Repo from './Repo';

const RepoList = ({ data, refetch, showAllDelete }) => {
  return (
    <ul>
      {data.map((repo) => {
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
