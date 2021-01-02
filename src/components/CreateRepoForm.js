import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_REPO } from '../graphql/mutations';

const CreateRepoForm = () => {
  const initialState = {
    repoName: '',
    repoVisibility: '',
  };
  const [repoValues, setRepoValues] = useState(initialState);
  const [createRepo] = useMutation(CREATE_REPO);
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
