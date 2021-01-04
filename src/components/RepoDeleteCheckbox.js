import React from 'react';

const RepoDeleteCheckbox = ({ showAllDelete, handleCheck }) => {
  return (
    <label>
      <input type="checkbox" checked={showAllDelete} onChange={handleCheck} />
      Show delete button for all repos
    </label>
  );
};

export default RepoDeleteCheckbox;
