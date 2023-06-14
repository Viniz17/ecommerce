import { useState, useEffect } from "react";
import axios from "axios";
import { Box, Heading, Image, Text, VStack } from "@chakra-ui/react";
import MainLayout from "../../components/MainLayout";

const Perfil = () => {
  const [pedidos, setPedidos] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/pedidos?idUser=${userId}`);
        const pedidosData = response.data;

        // Obter informações completas de cada item do pedido
        const pedidosCompletos = await Promise.all(
          pedidosData.map(async (pedido) => {
            const itensCompletos = await Promise.all(
              pedido.itens.map(async (item) => {
                const produtoResponse = await axios.get(
                  `http://localhost:3000/produtos/${item.idProduto}`
                );
                const produto = produtoResponse.data;
                const itemComDetalhes = {
                  ...item,
                  nome: produto.nome,
                  imagem: produto.imagem,
                  preco: produto.preco,
                };
                return itemComDetalhes;
              })
            );

            return {
              ...pedido,
              itens: itensCompletos,
            };
          })
        );

        setPedidos(pedidosCompletos);
      } catch (error) {
        console.error(error);
      }
    };

    if (userId) {
      fetchPedidos();
    }
  }, [userId]);

  return (
    <MainLayout>
      <Box p={4}>
        <Heading as="h1" size="xl" mb={4}>
          Meus Pedidos
        </Heading>
        {pedidos.length === 0 ? (
          <Text>Nenhum pedido encontrado.</Text>
        ) : (
          <VStack align="start" spacing={4} mb={4} width="100%">
            {pedidos.map((pedido) => (
              <Box key={pedido.id} p={4} borderWidth={1} borderRadius="md" width="100%">
                <Text fontSize="lg" fontWeight="bold" mb={2}>
                  Valor Total: R$ {pedido.valorTotal.toFixed(2)}
                </Text>
                <Text fontSize="md" fontWeight="bold" mb={2}>
                  Itens:
                </Text>
                <VStack align="start" spacing={2} ml={4}>
                  {pedido.itens.map((item) => (
                    <Box key={item.idProduto} display="flex" alignItems="center">
                      <Image src={item.imagem} alt={item.nome} boxSize="100px" objectFit="cover" />
                      <VStack ml={4} align="start">
                        <Text fontSize="md" fontWeight="bold">
                          Produto: {item.nome}
                        </Text>
                        <Text fontSize="sm" color="gray.600">
                          Quantidade: {item.quantidade}
                        </Text>
                        <Text fontSize="sm" color="gray.600">
                          Valor unidade: R$ {item.preco.toFixed(2)}
                        </Text>
                      </VStack>
                    </Box>
                  ))}
                </VStack>
              </Box>
            ))}
          </VStack>
        )}
      </Box>
    </MainLayout>
  );
};

export default Perfil;
