import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_REPO } from '../graphql/mutations';

const CreateRepoForm = () => {
  const initialState = {
    repoName: '',
    repoVisibility: '',
  };
  const [repoValues, setRepoValues] = useState(initialState);
  const [createRepo, { data }] = useMutation(CREATE_REPO);
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
  const handleNameChange = (e) => {
    setRepoValues({ ...repoValues, repoName: e.target.value });
  };
  const handleVisibilityChange = (e) => {
    setRepoValues({ ...repoValues, repoVisibility: e.target.value });
  };
  return (
    <div>
      <label htmlFor="repo-name">Create new repo</label>
      <input
        type="text"
        name="repo-name"
        id="repo-name"
        placeholder="Repository name"
        value={repoValues.repoName}
        onChange={handleNameChange}
      />
      <select
        name="visibility"
        id="visibility-select"
        onChange={handleVisibilityChange}>
        <option value="">Repo visibility</option>
        <option value="PRIVATE">Private</option>
        <option value="PUBLIC">Public</option>
        <option value="INTERNAL">Internal</option>
      </select>
      <button type="submit" className="submit" onClick={handleSubmit}>
        Create
      </button>
    </div>
  );
};

export default CreateRepoForm;
