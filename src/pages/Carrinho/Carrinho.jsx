import { useState } from "react";
import { getItem, setItem } from "../../services/localStorageFuncs";
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

  const handleFinalizarCompra = () => {
    // Calcular a quantidade total de cada produto no carrinho
    const quantidadesTotais = carrinho.reduce((quantidades, item) => {
      const quantidadeSelecionada = item.quantidade; // Obter a quantidade selecionada pelo usuário
      quantidades[item.id] = quantidades[item.id] || 0;
      quantidades[item.id] += quantidadeSelecionada;
      return quantidades;
    }, {});

    // Fazer a requisição para diminuir a quantidade de produtos em estoque
    Object.keys(quantidadesTotais).forEach((itemId) => {
      const quantidadeTotal = quantidadesTotais[itemId];
      const item = carrinho.find((item) => item.id === itemId);

      if (item) {
        const novaQuantidade = item.quantidade - quantidadeTotal;

        axios
          .patch(`http://localhost:3000/produtos/${itemId}`, { quantidade: novaQuantidade })
          // eslint-disable-next-line no-unused-vars
          .then((response) => {
            console.log(`Quantidade do produto ${itemId} atualizada com sucesso.`);
          })
          .catch((error) => {
            console.error(`Erro ao atualizar a quantidade do produto ${itemId}: ${error}`);
          });
      }
    });

    setCarrinho([]);
    setItem("carrinho", []);

    toast.success("Compra finalizada com sucesso!");

    setTimeout(() => {
      window.location.href = "/";
    }, 3000);
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
      <h4>Valor Total R$:{calcularValorTotal()}</h4>
      {carrinho.length > 0 && <button onClick={handleFinalizarCompra}>Finalizar Compra</button>}
      {carrinho.length > 0 && <button onClick={limparCarrinho}>Limpar Carrinho</button>}
      <ToastContainer />
    </div>
  );
};

// eslint-disable-next-line no-irregular-whitespace
export default Carrinho;
