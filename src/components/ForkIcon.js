import React from 'react';

const ForkIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-git-fork"
      width="24"
      height="24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M0 0h24v24H0z" stroke="none" />
      <circle cx="12" cy="18" r="2" />
      <circle cx="7" cy="6" r="2" />
      <circle cx="17" cy="6" r="2" />
      <path d="M7 8v2a2 2 0 002 2h6a2 2 0 002-2V8M12 12v4" />
    </svg>
  );
};

export default ForkIcon;
