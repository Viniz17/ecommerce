import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { getItem, setItem } from "../../services/localStorageFuncs";
import { BsFillCartCheckFill, BsFillCartPlusFill } from "react-icons/bs";
import { toast } from "react-toastify";

const Produto = () => {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const [cart, setCart] = useState(getItem("carrinho") || []);
  const [quantidade, setQuantidade] = useState(1);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/produtos/${id}`)
      .then((response) => {
        setProduto(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  if (!produto) {
    return <div>Carregando...</div>;
  }

  const handleChangeQuantidade = (event) => {
    setQuantidade(event.target.value);
  };

  const handleClick = (obj) => {
    const element = cart.find((e) => e.id === obj.id);
    if (element) {
      const arrFilter = cart.filter((e) => e.id !== obj.id);
      setCart(arrFilter);
      setItem("carrinho", arrFilter);
    } else {
      const produtoComQuantidade = { ...obj, quantidade };
      setCart([...cart, produtoComQuantidade]);
      setItem("carrinho", [...cart, produtoComQuantidade]);
    }
  };

  const validarQuantidade = () => {
    if (quantidade <= produto.quantidade) {
      handleClick(produto);
    } else {
      console.log("Quantidade excede o disponível.");
      toast.error("Digite uma quantidade válida");
    }
  };

  return (
    <>
      <Link to="/teste">Voltar</Link>
      <Link to="/carrinho">Carrinho</Link>
      <div>
        <h1>{produto.nome}</h1>
        <img src={produto.imagem} alt={produto.nome} />
        <h4>R${produto.preco}</h4>
        <h4>{produto.descrição}</h4>
        <h4>Estoque: {produto.quantidade}</h4>
        <input type="number" value={quantidade} onChange={handleChangeQuantidade} />
        <button onClick={validarQuantidade}>
          {cart.some((itemCart) => itemCart.id === produto.id) ? (
            <BsFillCartCheckFill />
          ) : (
            <BsFillCartPlusFill />
          )}
        </button>
      </div>
    </>
  );
};

// eslint-disable-next-line no-irregular-whitespace
export default Produto;
