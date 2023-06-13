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
            {produto.descrição}
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
            colorScheme={cart.some((itemCart) => itemCart.id === produto.id) ? "green" : "blue"}
            leftIcon={
              cart.some((itemCart) => itemCart.id === produto.id) ? (
                <BsFillCartCheckFill />
              ) : (
                <BsFillCartPlusFill />
              )
            }
          >
            {cart.some((itemCart) => itemCart.id === produto.id)
              ? "Adicionado"
              : "Adicionar ao Carrinho"}
          </Button>
        </Flex>
        <ToastContainer />
      </Box>
    </MainLayout>
  );
};

export default Produto;
