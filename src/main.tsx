import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login/Login.jsx";
import Cadastro from "./pages/Cadastro/Cadastro.jsx";
import Listagem from "./pages/Listagem/Listagem.jsx";
import Carrinho from "./pages/Carrinho/Carrinho.jsx";
import Produto from "./pages/Produto/Produto.jsx";
import Perfil from "./pages/Perfil/Perfil.jsx";
import { ChakraProvider } from "@chakra-ui/react";

import App from "./App.js";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element with id 'root' not found");
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "*",
    element: <App />,
  },
  {
    path: "cadastro",
    element: <Cadastro />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "listagem",
    element: <Listagem />,
  },
  {
    path: "carrinho",
    element: <Carrinho />,
  },
  {
    path: "/produto/:id",
    element: <Produto />,
  },
  {
    path: "/perfil",
    element: <Perfil />,
  },
]);

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);

export default router;
