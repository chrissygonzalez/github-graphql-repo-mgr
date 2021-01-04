import React, { useState } from 'react';
import ForkIcon from './ForkIcon';

const Repo = ({ repo, refetch, showAllDelete }) => {
  const [repoDeleted, setRepoDeleted] = useState(false);
  const lastUpdated = new Date(repo.node.updatedAt).toDateString();
  const isFork = repo.node.isFork;
  const handleDelete = (repo) => {
    setRepoDeleted(true);
    deleteRepo(repo);
  };
  const deleteRepo = (repo) => {
    return fetch('https://api.github.com/repos/chrissygonzalez/' + repo, {
      method: 'delete',
      headers: {
        authorization: `token ${process.env.REACT_APP_GITHUB_KEY}`,
      },
    }).then((response) => {
      refetch();
    });
  };

  const repoClasses = repoDeleted
    ? 'repo-content  repo-deleted'
    : 'repo-content';

  return (
    <li>
      {isFork && (
        <div className="flex">
          <ForkIcon />
        </div>
      )}
      <div className={repoClasses}>
        <div>
          <a href={repo.node.url} className="bold">
            {repo.node.nameWithOwner}
          </a>
          <p className="small">Last updated {lastUpdated}</p>
          {isFork && (
            <p className="small italic">
              Forked from{' '}
              <a href={repo.node.parent.url}>
                {repo.node.parent.nameWithOwner}
              </a>{' '}
              by {repo.node.parent.owner.login}
            </p>
          )}
        </div>
        {isFork && (
          <button onClick={() => deleteRepo(repo.node.name)}>
            Delete forked repo
          </button>
        )}
        {!isFork && showAllDelete && (
          <button onClick={() => handleDelete(repo.node.name)}>
            Delete repo
          </button>
        )}
      </div>
    </li>
  );
};

export default Repo;
