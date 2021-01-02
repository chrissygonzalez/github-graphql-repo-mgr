import React from 'react';
import Repo from './Repo';

const RepoList = ({ data, refetch }) => {
  return (
    <ul>
      {data.map((repo) => {
        return <Repo repo={repo} refetch={refetch} key={repo.cursor} />;
      })}
    </ul>
  );
};

export default RepoList;
