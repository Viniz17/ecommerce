import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { getItem, setItem } from "../../services/LocalStorageFuncs";
import { BsFillCartCheckFill, BsFillCartPlusFill } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import { Box, Image, Heading, Text, Flex, Input, Button } from "@chakra-ui/react";
import "react-toastify/dist/ReactToastify.css";

import MainLayout from "../../components/MainLayout";

const Produto = () => {
  const { id } = useParams();
  const [cart, setCart] = useState(getItem("carrinho") || []);
  const [quantidade, setQuantidade] = useState(1);
  const [user, setUser] = useState(null);
  const [produto, setProduto] = useState({});

  useEffect(() => {
    const userId = localStorage.getItem("userId"); // Obter o userId do localStorage

    if (userId) {
      setUser({ userId }); // Configurar o userId como o valor inicial do estado user
    }
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/produtos/${id}`)
      .then((response) => {
        const produtoData = response.data;
        if (!produtoData.ratings) {
          produtoData.ratings = [];
        }
        setProduto(produtoData);
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
      toast.warning("Produto removido do carrinho!");
    } else {
      const produtoComQuantidade = { ...obj, quantidade };
      const updatedCart = [...cart, produtoComQuantidade];
      setCart(updatedCart);
      setItem("carrinho", updatedCart);
      toast.success("Produto adicionado ao carrinho");
    }
  };

  const validarQuantidade = () => {
    if (quantidade <= produto.quantidade) {
      handleClick(produto);
    } else {
      toast.error("Quantidade indisponível");
    }
  };

  const handleRating = (rating) => {
    if (!user) {
      toast.warning("Você precisa estar logado para avaliar um produto!");
      return;
    }

    if (produto.ratings && produto.ratings.includes(user.userId)) {
      toast.warning("Você já avaliou este produto!");
      return;
    }

    const updatedProduto = { ...produto };
    if (rating === "positive") {
      updatedProduto.feedbackPositivo += 1;
    } else if (rating === "negative") {
      updatedProduto.feedbackNegativo += 1;
    }
    updatedProduto.ratings = updatedProduto.ratings || [];
    updatedProduto.ratings.push(user.userId);

    axios
      .patch(`http://localhost:3000/produtos/${id}`, updatedProduto)
      .then((response) => {
        setProduto(response.data);
        toast.success("Avaliação registrada com sucesso!");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Ocorreu um erro ao registrar a avaliação");
      });
  };

  return (
    <MainLayout>
      <Box py={4} px={8}>
        <Flex alignItems="center" flexDirection="column" mt={4}>
          <Heading as="h1" size="xl" mb={2}>
            {produto.nome}
          </Heading>
          <Image src={produto.imagem} alt={produto.nome} mb={2} maxW="300px" />
          <Text fontSize="xl" fontWeight="bold" mb={2}>
            R${produto.preco}
          </Text>
          <Text fontSize="lg" color="gray.600" mb={2}>
            {produto.descricao}
          </Text>
          <Text fontSize="lg" color="gray.600" mb={2}>
            Estoque: {produto.quantidade}
          </Text>
          <Text fontSize="lg" color="gray.600" mb={2}>
            Quantidade
          </Text>
          <Input
            type="number"
            value={quantidade}
            onChange={handleChangeQuantidade}
            width="100px"
            mb={2}
          />
          <Button
            onClick={validarQuantidade}
            colorScheme={cart.some((itemCart) => itemCart.id === produto.id) ? "yellow" : "blue"}
            leftIcon={
              cart.some((itemCart) => itemCart.id === produto.id) ? (
                <BsFillCartCheckFill />
              ) : (
                <BsFillCartPlusFill />
              )
            }
          >
            {cart.some((itemCart) => itemCart.id === produto.id)
              ? "Remover do Carrinho"
              : "Adicionar ao Carrinho"}
          </Button>
        </Flex>
        <Flex justifyContent="center" mt={8}>
          <Button
            colorScheme="green"
            disabled={!user || (produto.ratings && produto.ratings.includes(user.userId))}
            onClick={() => handleRating("positive")}
            mr={4}
          >
            Gostei ({produto.feedbackPositivo})
          </Button>
          <Button
            colorScheme="red"
            disabled={!user || (produto.ratings && produto.ratings.includes(user.userId))}
            onClick={() => handleRating("negative")}
          >
            Não Gostei ({produto.feedbackNegativo})
          </Button>
        </Flex>
      </Box>
      <ToastContainer />
    </MainLayout>
  );
};

export default Produto;
