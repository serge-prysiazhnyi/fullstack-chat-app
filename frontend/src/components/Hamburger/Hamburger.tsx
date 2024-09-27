import React from 'react';

interface HamburgerProps {
  isOpen: boolean;
  setIsOpen: () => void;
}

export const Hamburger: React.FC<HamburgerProps> = ({ isOpen, setIsOpen }) => {
  return (
    <button
      className={`
          lg:hidden fixed top-2 z-20 btn btn-circle
          ${isOpen ? 'right-2' : 'left-2'}
          bg-sky-500 hover:bg-sky-700 text-white
          `}
      onClick={setIsOpen}
    >
      {isOpen ? (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      ) : (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      )}
    </button>
  );
};
