import React from "react";

const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <div>
      <input
        value={searchTerm}
        placeholder="Search task"
        className="bg-gray-200 w-full p-2 m-2"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default Search;
