import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { SimpleGrid, Box, Heading, Image, Text, Select, Button } from "@chakra-ui/react";

import SearchBar from "../../components/SearchBar";
import MainLayout from "../../components/MainLayout";

const Listagem = () => {
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [sortOrder, setSortOrder] = useState("preco_asc"); // Initial sort order: ascending by price
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  useEffect(() => {
    axios
      .get("http://localhost:3000/produtos")
      .then((response) => {
        setData(response.data);
        setFilteredItems(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    filterItems(searchValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  useEffect(() => {
    sortItems(sortOrder);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortOrder]);

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  const filterItems = (value) => {
    const filtered = data.filter((item) => item.nome.toLowerCase().includes(value.toLowerCase()));
    setFilteredItems(filtered);
  };

  const sortItems = (order) => {
    let sorted;
    if (order === "preco_asc") {
      sorted = [...filteredItems].sort((a, b) => a.preco - b.preco);
    } else if (order === "preco_desc") {
      sorted = [...filteredItems].sort((a, b) => b.preco - a.preco);
    }
    setFilteredItems(sorted);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  // Paginação
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <MainLayout>
      <Box p={4}>
        <SearchBar handleSearch={handleSearch} />
        <Heading as="h1" size="xl" mb={4}></Heading>
        <Select
          value={sortOrder}
          onChange={handleSortOrderChange}
          mb={4}
          size="sm"
          variant="outline"
          width="fit-content"
        >
          <option value="preco_asc">Filtro (Mais barato)</option>
          <option value="preco_desc">Filtro (Mais caro)</option>
        </Select>
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 2 }} spacing={8}>
          {currentItems.map((item) => {
            if (item.quantidade > 0) {
              return (
                <Link key={item.id} to={`/produto/${item.id}`}>
                  <Box
                    p={4}
                    borderWidth={1}
                    borderRadius="md"
                    height="100%"
                    width="100%"
                    transition="all 0.3s"
                    _hover={{
                      transform: "scale(1.05)",
                      boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    <Box
                      height="100%"
                      display="flex"
                      flexDirection="column"
                      justifyContent="space-between"
                    >
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        minHeight="200px"
                      >
                        <Image
                          src={item.imagem}
                          alt={item.nome}
                          boxSize="200px"
                          objectFit="cover"
                        />
                      </Box>
                      <Text fontSize="sm" color="gray.500" textAlign="center">
                        {item.nome}
                      </Text>
                      <Text fontSize="lg" fontWeight="bold" mt={4} textAlign="center">
                        R${item.preco}
                      </Text>
                    </Box>
                  </Box>
                </Link>
              );
            }
            return null;
          })}
        </SimpleGrid>
        <Box display="flex" justifyContent="center" mt={4}>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <Button
              key={page}
              variant="outline"
              size="sm"
              mx={1}
              onClick={() => handlePageChange(page)}
              colorScheme={page === currentPage ? "blue" : "gray"}
            >
              {page}
            </Button>
          ))}
        </Box>
      </Box>
    </MainLayout>
  );
};

export default Listagem;
