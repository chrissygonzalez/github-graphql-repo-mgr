import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_REPO } from '../graphql/mutations';
import { GET_REPOS } from '../graphql/queries';

const CreateRepoForm = ({ direction }) => {
  const username = process.env.REACT_APP_GITHUB_USER;
  const initialState = {
    repoName: '',
    repoVisibility: 'PUBLIC',
  };
  const [repoValues, setRepoValues] = useState(initialState);
  const [createRepo, { data, error }] = useMutation(CREATE_REPO, {
    refetchQueries: [
      { query: GET_REPOS, variables: { login: username, direction } },
    ],
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    createRepo({
      variables: {
        name: repoValues.repoName,
        visibility: repoValues.repoVisibility,
      },
    });
    setRepoValues(initialState);
  };
  const handleChange = (e) => {
    setRepoValues({ ...repoValues, [e.target.id]: e.target.value });
  };
  return (
    <div>
      <label htmlFor="repo-name">Create new repo</label>
      <input
        type="text"
        name="repo-name"
        id="repoName"
        placeholder="Repository name"
        value={repoValues.repoName}
        onChange={handleChange}
      />
      <select name="visibility" id="repoVisibility" onChange={handleChange}>
        <option value="PUBLIC">Public</option>
        <option value="PRIVATE">Private</option>
        <option value="INTERNAL">Internal</option>
      </select>
      <button type="submit" className="submit" onClick={handleSubmit}>
        Create
      </button>
    </div>
  );
};

export default CreateRepoForm;
