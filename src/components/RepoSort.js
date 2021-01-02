import React from 'react';

const RepoSort = ({ onChange }) => {
  return (
    <select
      name="direction"
      id="direction"
      className="direction"
      onChange={onChange}>
      <option value="ASC">Oldest first</option>
      <option value="DESC">Newest first</option>
    </select>
  );
};

export default RepoSort;
