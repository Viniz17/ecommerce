import { useState, useEffect } from "react";
import axios from "axios";
import Styles from "./Layout";
//import SearchBar from "./SearchBar";
import React from "react";

const Teste2 = () => {
  const { search, setSearch } = React.useState("");

  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/produtos")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  console.log(search);
  return (
    <Styles>
      {/* <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} /> */}
      <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} />
      <div>
        <h1>Lista</h1>
        <div>
          {data.map((item) => (
            <div key={item.id}>
              <h4>{item.nome}</h4>
              <img src={item.imagem} alt={item.nome} />
              <h4>R${item.preco}</h4>
              <h4>{item.descrição}</h4>
            </div>
          ))}
        </div>
      </div>
    </Styles>
  );
};

export default Teste2;
