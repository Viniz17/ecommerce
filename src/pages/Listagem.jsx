import { useState, useEffect } from "react";
import axios from "axios";
import ADLayout from "../components/Layout";

const Listagem = () => {
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

  return (
    <ADLayout>
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
    </ADLayout>
  );
};

export default Listagem;
