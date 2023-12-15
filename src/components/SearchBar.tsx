import { useState } from "react";
import { Flex, Input, Button } from "@chakra-ui/react";
import React from "react";

// eslint-disable-next-line react/prop-types
const SearchBar = ({ handleSearch }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch(searchValue);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex alignItems="center">
        <Input
          type="text"
          value={searchValue}
          onChange={handleChange}
          placeholder="Pesquisar..."
          mr={2}
        />
        <Button type="submit" colorScheme="teal">
          Pesquisar
        </Button>
      </Flex>
    </form>
  );
};

// eslint-disable-next-line no-irregular-whitespace
export default SearchBar;
