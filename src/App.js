import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import './App.css';
import RepoList from './components/RepoList';

const REPOS = gql`
  query REPOS($login: String!) {
    user(login: $login) {
      name
      websiteUrl
      repositories(first: 100, orderBy: { field: UPDATED_AT, direction: ASC }) {
        edges {
          cursor
          node {
            nameWithOwner
            name
            isFork @include(if: true)
            url
            updatedAt
            parent {
              nameWithOwner
              owner {
                login
              }
              url
            }
          }
        }
      }
    }
  }
`;

function App() {
  const [showAllRepos, setShowAllRepos] = useState(true);
  const { loading, error, refetch, data } = useQuery(REPOS, {
    variables: { login: 'chrissygonzalez' },
  });
  if (error) return { error };
  if (loading) return <h1>Loading...</h1>;
  const allRepos = data.user.repositories.edges;
  const forkedRepos = allRepos.filter((repo) => repo.node.isFork === true);
  const reposToShow = showAllRepos ? allRepos : forkedRepos;
  return (
    <>
      <header>
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
        <label for="repo-name">Create new repo</label>
        <input
          type="text"
          name="repo-name"
          id="repo-name"
          placeholder="Repository name"
        />
        <select name="visibility" id="visibility-select">
          <option value="">Choose a visibility level</option>
          <option value="PRIVATE">Private</option>
          <option value="PUBLIC">Public</option>
          <option value="INTERNAL">Internal</option>
        </select>
      </header>
      <main className="App">
        <RepoList data={reposToShow} refetch={refetch} />
      </main>
    </>
  );
}

export default App;
