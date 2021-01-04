import React, { useState } from 'react';
import './App.css';
import RepoList from './components/RepoList';
import RepoSort from './components/RepoSort';
import RepoButton from './components/RepoButton';
import CreateRepoForm from './components/CreateRepoForm';
import RepoDeleteCheckbox from './components/RepoDeleteCheckbox';

function App() {
  const [showAllRepos, setShowAllRepos] = useState(true);
  const [direction, setDirection] = useState('ASC');
  const [showAllDelete, setShowAllDelete] = useState(false);
  const handleDirectionChange = (e) => {
    setDirection(e.target.value);
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
        <CreateRepoForm direction={direction} />
      </header>
      <main>
        <RepoSort onChange={handleDirectionChange} />
        <RepoDeleteCheckbox
          showAllDelete={showAllDelete}
          handleCheck={handleCheck}
        />
        <RepoList
          showAllRepos={showAllRepos}
          showAllDelete={showAllDelete}
          direction={direction}
        />
      </main>
    </>
  );
}

export default App;
