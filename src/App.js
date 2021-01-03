import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import './App.css';
import RepoList from './components/RepoList';
import RepoSort from './components/RepoSort';
import RepoButton from './components/RepoButton';
import CreateRepoForm from './components/CreateRepoForm';
import { GET_REPOS } from './graphql/queries';

function App() {
  const [showAllRepos, setShowAllRepos] = useState(true);
  const [direction, setDirection] = useState('ASC');
  const [showAllDelete, setShowAllDelete] = useState(false);
  const username = process.env.REACT_APP_GITHUB_USER;
  const { loading, error, refetch, data } = useQuery(GET_REPOS, {
    variables: { login: username, direction },
  });
  if (error) return { error };
  if (loading) return <h1>Loading...</h1>;

  const allRepos = data.user.repositories.edges;
  const forkedRepos = allRepos.filter((repo) => repo.node.isFork === true);
  const reposToShow = showAllRepos ? allRepos : forkedRepos;
  const handleDirectionChange = (e) => {
    setDirection(e.target.value);
    refetch();
  };
  const handleCheck = (e) => {
    setShowAllDelete(e.target.checked);
  };
  const handleButtonClick = () => {
    setShowAllRepos(!showAllRepos);
  };

  return (
    <>
      <header className="flex space-between">
        <div>
          GitHub Repo Manager
          <RepoButton
            condition={showAllRepos}
            handleClick={handleButtonClick}
            text="All Repos"
          />
          <RepoButton
            condition={!showAllRepos}
            handleClick={handleButtonClick}
            text="Forked Repos"
          />
        </div>
        <CreateRepoForm />
      </header>
      <main>
        <RepoSort onChange={handleDirectionChange} />
        <label>
          <input
            type="checkbox"
            checked={showAllDelete}
            onChange={handleCheck}
          />
          Show delete button for all repos
        </label>
        <RepoList
          data={reposToShow}
          refetch={refetch}
          showAllDelete={showAllDelete}
        />
      </main>
    </>
  );
}

export default App;
