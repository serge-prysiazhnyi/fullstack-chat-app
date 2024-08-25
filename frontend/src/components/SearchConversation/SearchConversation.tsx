/// <reference types="vite-plugin-svgr/client" />
import SearchIcon from '../../assets/search.svg?react';

export const SearchConversation = () => {
  return (
    <form className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Search..."
        className="input input-bordered rounded-full"
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <SearchIcon className="w-full h-6" />
      </button>
    </form>
  );
};
