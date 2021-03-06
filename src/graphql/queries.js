import gql from 'graphql-tag';

export const GET_REPOS = gql`
  query GET_REPOS($login: String!, $direction: String!) {
    user(login: $login) {
      name
      websiteUrl
      repositories(
        first: 100
        orderBy: { field: UPDATED_AT, direction: $direction }
      ) {
        edges {
          cursor
          node {
            nameWithOwner
            name
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
