import React, { useState } from 'react';

const Search = ({ data, handleSearchResults }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const results = data.filter(item =>
      item.toLowerCase().includes(searchTerm.toLowerCase())
    );
    handleSearchResults(results);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search..."
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Search;