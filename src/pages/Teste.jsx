import { useState, useEffect } from "react";
import axios from "axios";
import ADLayout from "../components/Layout";
import SearchBar from "../components/SearchBar";

const Teste = () => {
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

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

  const handleSearch = (value) => {
    setSearchValue(value);
    filterItems(value);
  };

  const filterItems = (value) => {
    const filtered = data.filter((item) => item.nome.toLowerCase().includes(value.toLowerCase()));
    setFilteredItems(filtered);
  };

  return (
    <ADLayout>
      <div>
        <SearchBar handleSearch={handleSearch} />
        <h1>Lista</h1>
        <div>
          {filteredItems.map((item) => {
            return (
              <div key={item.id}>
                <h4>{item.nome}</h4>
                <img src={item.imagem} alt={item.nome} />
                <h4>R${item.preco}</h4>
                <h4>{item.descrição}</h4>
              </div>
            );
          })}
        </div>
      </div>
    </ADLayout>
  );
};

export default Teste;
