import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchBar from "../../components/SearchBar";

const Listagem = () => {
  const [data, setData] = useState([]);
  const [setSearchValue] = useState("");
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
    <div>
      <SearchBar handleSearch={handleSearch} />
      <h1>Lista</h1>
      <div>
        {filteredItems.map((item) => {
          if (item.quantidade > 0) {
            return (
              <Link key={item.id} to={`/produto/${item.id}`}>
                <div>
                  <h4>{item.nome}</h4>
                  <img src={item.imagem} alt={item.nome} />
                  <h4>R${item.preco}</h4>
                  <h4>{item.descricao}</h4>
                </div>
              </Link>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

// eslint-disable-next-line no-irregular-whitespace
export default Listagem;
