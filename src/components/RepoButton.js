import React from 'react';

const RepoButton = ({ condition, handleClick, text }) => {
  return (
    <button
      className={condition ? 'toggle selected' : 'toggle'}
      onClick={handleClick}>
      {text}
    </button>
  );
};

export default RepoButton;
