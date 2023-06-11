import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Cadastro from "./pages/Cadastro.jsx";
import Listagem from "./pages/Listagem.jsx";
import Carrinho from "./pages/Carrinho.jsx";
import Produto from "./pages/Produto.jsx";
import Teste from "./pages/Teste";
import Teste2 from "./pages/Teste2.jsx";
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
    path: "produto",
    element: <Produto />,
  },
  {
    path: "teste",
    element: <Teste />,
  },
  {
    path: "teste2",
    element: <Teste2 />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

export default router;
