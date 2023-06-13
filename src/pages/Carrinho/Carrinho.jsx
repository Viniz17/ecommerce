import { useState } from "react";
import { getItem, setItem } from "../../services/LocalStorageFuncs";
import { BsFillCartDashFill } from "react-icons/bs";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Carrinho = () => {
  const [carrinho, setCarrinho] = useState(getItem("carrinho") || []);

  const removeItem = (obj) => {
    const carrinhoAtualizado = carrinho.filter((e) => e.id !== obj.id);
    setCarrinho(carrinhoAtualizado);
    setItem("carrinho", carrinhoAtualizado);
  };

  const limparCarrinho = () => {
    setCarrinho([]);
    setItem("carrinho", []);
  };

  const calcularValorTotal = () => {
    let total = 0;
    carrinho.forEach((item) => {
      total += item.preco * item.quantidade;
    });
    return total.toFixed(2);
  };

  const handleFinalizarCompra = async () => {
    await Promise.all(
      carrinho.map(async (item) => {
        const response = await axios.get(`http://localhost:3000/produtos/${item.id}`);
        const produto = response.data;

        const novaQuantidade = produto.quantidade - item.quantidade;
        await axios.patch(`http://localhost:3000/produtos/${item.id}`, {
          quantidade: novaQuantidade,
        });
      })
    );

    setCarrinho([]);
    setItem("carrinho", []);

    toast.success("Compra finalizada com sucesso!");

    setTimeout(() => {
      window.location.href = "/teste";
    }, 5000);
  };

  return (
    <div>
      <h1>Cart</h1>
      <div>
        {carrinho.map((item) => (
          <div key={item.id}>
            <h4>{item.nome}</h4>
            <h4>R$ {item.preco}</h4>
            <h4>Quantidade: {item.quantidade}</h4>
            <button onClick={() => removeItem(item)}>
              <BsFillCartDashFill />
            </button>
          </div>
        ))}
      </div>
      <h4>Valor Total: R$ {calcularValorTotal()}</h4>
      {carrinho.length > 0 && <button onClick={handleFinalizarCompra}>Finalizar Compra</button>}
      {carrinho.length > 0 && <button onClick={limparCarrinho}>Limpar Carrinho</button>}
      <ToastContainer />
    </div>
  );
};

// eslint-disable-next-line no-irregular-whitespace
export default Carrinho;
