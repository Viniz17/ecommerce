import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import "./Login.css";
import "../Cadastro/Cadastro.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import MainLayout from "../../components/MainLayout.js";
import React from "react";

const Login = () => {
  const navigate = useNavigate();
  localStorage.setItem("isLoggedIn", "false");
  localStorage.removeItem("id");

  const onFinish = async ({ username, password }) => {
    try {
      const response = await axios.post("http://localhost:3000/login", {
        email: username,
        password: password,
      });

      if (response.status === 200) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userId", response.data.user.id);
        localStorage.setItem("userName", response.data.user.name); // Guarda o campo "name" no localStorage
        toast.success("Logado com sucesso!");
        setTimeout(() => {
          navigate("/listagem");
        }, 1000);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error("Email ou senha inválidos!");
      } else {
        toast.error("Erro ao fazer login. Por favor, tente novamente mais tarde.");
      }
    }
  };

  return (
    <MainLayout>
      <div className="formulario">
        <div className="formulario-filho">
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <div style={{ display: "flex", alignItems: "center" }} />
            <img src="/allstar.png" alt="Logo" style={{ marginRight: "10px" }} />
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Por favor, insira o seu email!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Por favor, insira sua senha!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Senha"
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Entrar
              </Button>
              Ou <a href="/cadastro">registre-se agora!</a>
            </Form.Item>
          </Form>
        </div>
      </div>
      <ToastContainer />
    </MainLayout>
  );
};

export default Login;
