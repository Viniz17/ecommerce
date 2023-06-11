// import { Input } from "antd";
// const { Search } = Input;

// const SearchBar = () => {
//   return (
//     <>
//       <Search placeholder="Procure o produto pelo nome" enterButton="Search" size="large" />
//     </>
//   );
// };

// export default SearchBar;

import React, { useState } from 'react';

const SearchBar = ({ handleSearch }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch(searchValue);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchValue}
        onChange={handleChange}
        placeholder="Pesquisar..."
      />
      <button type="submit">Pesquisar</button>
    </form>
  );
};

export default SearchBar;