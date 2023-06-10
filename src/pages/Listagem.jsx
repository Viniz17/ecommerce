import { useState, useEffect } from "react";
import axios from "axios";
import Styles from "./Styles";

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
    <Styles>
      <div>
        <h1>Lista</h1>
        <div>
          {data.map((item) => (
            <div key={item.id}>
              <h4>{item.nome}</h4>
              <h4>R${item.preco}</h4>
            </div>
          ))}
        </div>
      </div>
    </Styles>
  );
};

export default Listagem;
