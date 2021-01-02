import gql from 'graphql-tag';

export const CREATE_REPO = gql`
  mutation CREATE_REPO($name: String!, $visibility: String!) {
    createRepository(input: { name: $name, visibility: $visibility }) {
      clientMutationId
      repository {
        name
      }
    }
  }
`;
