import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login/Login.jsx";
import Cadastro from "./pages/Cadastro/Cadastro.jsx";
import Listagem from "./pages/Listagem/Listagem.jsx";
import Carrinho from "./pages/Carrinho/Carrinho.jsx";
import Produto from "./pages/Produto/Produto.jsx";
import Teste from "./pages/Testes/Teste.jsx";

import App from "./App.jsx";

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
    path: "teste",
    element: <Teste />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

export default router;
