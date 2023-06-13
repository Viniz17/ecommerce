import { useEffect, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { FiShoppingCart, FiUser } from "react-icons/fi";

// eslint-disable-next-line react/prop-types
const MainLayout = ({ children }) => {
  const location = useLocation();
  const isCarrinhoPage = location.pathname === "/carrinho";
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("carrinho")) || [];
    const itemCount = cart.reduce((total, item) => total + Number(item.quantidade), 0); // Converter a quantidade para número
    setCartItemCount(itemCount);
  }, []);

  return (
    <Box minHeight="100vh" backgroundColor="#fff" display="flex" flexDirection="column">
      <Box bg="#1a202c" color="white" py={4} px={6}>
        <Flex alignItems="center" justifyContent="space-between">
          <Link to="/listagem">
            <Box fontSize="xl" fontWeight="bold" display="flex" alignItems="center">
              SerraShoes
            </Box>
          </Link>
          <Flex alignItems="center">
            {!isCarrinhoPage && (
              <Flex ml={4}>
                <Link to="/carrinho">
                  <Box mr={6} display="flex" alignItems="center">
                    <FiShoppingCart size={24} />
                    {cartItemCount > 0 && (
                      <Box
                        bg="red"
                        color="white"
                        borderRadius="full"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        h={4}
                        w={4}
                        fontSize="xs"
                        ml={-2}
                      >
                        {cartItemCount}
                      </Box>
                    )}
                  </Box>
                </Link>
              </Flex>
            )}
            <Link to="/login">
              <Box display="flex" alignItems="center">
                <FiUser size={24} />
              </Box>
            </Link>
          </Flex>
        </Flex>
      </Box>
      <Box flex="1" py={6} px={8}>
        <Box maxW="800px" mx="auto">
          {children}
        </Box>
      </Box>
      <Box bg="#1a202c" color="white" py={4} textAlign="center">
        Trabalho - Grupo 6
      </Box>
    </Box>
  );
};

export default MainLayout;
