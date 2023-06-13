import { useState } from "react";
import { Box, Button, Flex, Heading, IconButton, Image, Text, VStack } from "@chakra-ui/react";
import { BsFillCartDashFill } from "react-icons/bs";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getItem, setItem } from "../../services/LocalStorageFuncs";
import MainLayout from "../../components/MainLayout";

const Carrinho = () => {
  const [carrinho, setCarrinho] = useState(getItem("carrinho") || []);
  const navigate = useNavigate();
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
      navigate("/");
    }, 5000);
  };

  return (
    <MainLayout>
      <Box p={4}>
        <Heading as="h1" size="xl" mb={4}></Heading>
        {carrinho.length === 0 ? (
          <Box p={4} borderWidth={1} borderRadius="md" textAlign="center">
            <Text fontSize="xl" mb={4}>
              Seu carrinho está vazio.
            </Text>
            <Link to="/lista">
              <Button colorScheme="teal" size="lg">
                Voltar para a lista de produtos
              </Button>
            </Link>
          </Box>
        ) : (
          <VStack align="start" spacing={4} mb={4} width="100%">
            {carrinho.map((item) => (
              <Flex
                key={item.id}
                alignItems="center"
                p={4}
                borderWidth={1}
                borderRadius="md"
                width="100%"
              >
                <Link to={`/produto/${item.id}`}>
                  <Image src={item.imagem} alt={item.nome} boxSize="100px" objectFit="cover" />
                </Link>
                <VStack align="start" ml={4} flex="1">
                  <Link to={`/produto/${item.id}`}>
                    <Heading as="h4" size="md">
                      {item.nome}
                    </Heading>
                  </Link>
                  <Text fontSize="sm" color="gray.500">
                    R$ {item.preco}
                  </Text>
                  <Text fontSize="sm">Quantidade: {item.quantidade}</Text>
                </VStack>
                <IconButton
                  icon={<BsFillCartDashFill />}
                  aria-label="Remover"
                  variant="ghost"
                  onClick={() => removeItem(item)}
                />
              </Flex>
            ))}
          </VStack>
        )}
        {carrinho.length > 0 && (
          <Flex justifyContent="space-between" alignItems="center" mt={4}>
            <Text fontSize="lg" fontWeight="bold">
              Valor Total: R$ {calcularValorTotal()}
            </Text>
            <Flex>
              <Button colorScheme="red" onClick={limparCarrinho}>
                Limpar Carrinho
              </Button>
              <Button colorScheme="green" ml={4} onClick={handleFinalizarCompra}>
                Finalizar Compra
              </Button>
            </Flex>
          </Flex>
        )}
        <ToastContainer />
      </Box>
    </MainLayout>
  );
};

export default Carrinho;
