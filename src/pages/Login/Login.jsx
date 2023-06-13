import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import "./login.css";
import "../Cadastro/Cadastro.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import MainLayout from "../../components/MainLayout";

const Login = () => {
  const navigate = useNavigate();
  localStorage.setItem("isLoggedIn", "false");
  const onFinish = async ({ username, password }) => {
    try {
      const response = await axios.post("http://localhost:3000/login", {
        email: username,
        password: password,
      });

      if (response.status === 200) {
        localStorage.setItem("isLoggedIn", "true");
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
              <span style={{ color: "#fff" }}>Ou </span>
              <a
                href="/cadastro"
                style={{
                  color: "#fff",
                }}
              >
                registre-se agora!
              </a>
            </Form.Item>
          </Form>
        </div>
        <ToastContainer />
      </div>
    </MainLayout>
  );
};

export default Login;
