import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import './App.css';
import RepoList from './components/RepoList';
import RepoSort from './components/RepoSort';
import CreateRepoForm from './components/CreateRepoForm';
import { GET_REPOS } from './graphql/queries';

function App() {
  const [showAllRepos, setShowAllRepos] = useState(true);
  const [direction, setDirection] = useState('ASC');
  const [showAllDelete, setShowAllDelete] = useState(false);
  const { loading, error, refetch, data } = useQuery(GET_REPOS, {
    variables: { login: 'chrissygonzalez', direction },
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

  return (
    <>
      <header className="flex space-between">
        <div>
          GitHub Repo Manager
          <button
            className={showAllRepos ? 'toggle selected' : 'toggle'}
            onClick={() => setShowAllRepos(true)}>
            All Repos
          </button>
          <button
            className={showAllRepos ? 'toggle' : 'toggle selected'}
            onClick={() => setShowAllRepos(false)}>
            Forked Repos
          </button>
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
