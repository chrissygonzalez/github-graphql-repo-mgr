import React from 'react';
import Repo from './Repo';

const RepoList = ({ data, refetch }) => {
  return (
    <ul>
      {data.map((repo) => {
        return <Repo repo={repo} refetch={refetch} />;
      })}
    </ul>
  );
};

export default RepoList;
