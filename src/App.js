import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import './App.css';

const FORKED_REPOS = gql`
  query FORKED_REPOS($login: String!) {
    user(login: $login) {
      name
      websiteUrl
      repositories(first: 10, orderBy: { field: NAME, direction: DESC }) {
        edges {
          cursor
          node {
            nameWithOwner
            isFork
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

const Repo = ({ repo }) => {
  const lastUpdated = new Date(repo.node.updatedAt).toDateString();
  return (
    <li key={repo.cursor}>
      <a href={repo.node.url} className="bold">
        {repo.node.nameWithOwner}
      </a>
      <p className="small">Last updated {lastUpdated}</p>
      <p className="small">
        Forked from{' '}
        <a href={repo.node.parent.url}>{repo.node.parent.nameWithOwner}</a> by{' '}
        {repo.node.parent.owner.login}
      </p>
      <button onClick={() => alert('deleting!')}>Delete forked repo</button>
    </li>
  );
};

function App() {
  const { loading, error, data } = useQuery(FORKED_REPOS, {
    variables: { login: 'chrissygonzalez' },
  });
  if (error) return { error };
  if (loading) return <h1>Loading...</h1>;
  const forkedRepos = data.user.repositories.edges;

  return (
    <main className="App">
      <ul>
        {forkedRepos.map((repo) => {
          return <Repo repo={repo} />;
        })}
      </ul>
    </main>
  );
}

export default App;
