import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import './App.css';

const GET_USERS = gql`
  {
    users {
      id
      login
      avatar_url
    }
  }
`;

const SEARCH_FOR_REPOS = gql`
  query($search_term: String!) {
    search(query: $search_term, type: REPOSITORY, first: 20) {
      repositoryCount
      edges {
        node {
          ... on Repository {
            name
            owner {
              login
            }
            stargazers {
              totalCount
            }
            descriptionHTML
          }
        }
      }
    }
  }
`;

const USER_FORKED_REPOS = gql`
  query USER_FORKED_REPOS($login: String!) {
    user(login: $login) {
      repositories(last: 100) {
        edges {
          node {
            id
            name
            isFork
          }
        }
      }
    }
  }
`;

const TRY_THIS_QUERY = gql`
  query TRY_THIS_QUERY($login: String!) {
    user(login: $login) {
      name
      websiteUrl
      repositories(first: 10, orderBy: { field: NAME, direction: DESC }) {
        edges {
          cursor
          node {
            nameWithOwner
            isFork
            parent {
              nameWithOwner
              owner {
                login
              }
            }
          }
        }
      }
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(TRY_THIS_QUERY, {
    variables: { login: 'chrissygonzalez' },
  });
  if (error) return { error };
  if (loading) return <h1>Loading...</h1>;
  const forkedRepos = data.user.repositories.edges;

  return (
    <main className="App">
      <ul>
        {forkedRepos.map((repo) => {
          return (
            <li key={repo.cursor}>
              {repo.node.nameWithOwner} forked from{' '}
              {repo.node.parent.nameWithOwner} by {repo.node.parent.owner.login}
            </li>
          );
        })}
      </ul>
    </main>
  );
}

export default App;
