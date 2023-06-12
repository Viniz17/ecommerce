import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import "./login.css";
import "../Cadastro/Cadastro.jsx";
import axios from "axios";

// if (userValid.email != email || userValid.senha != senha){
//   alert ( "Senha ou login inválidos!")

const Login = () => {
  const onFinish = async ({ username, password }) => {
    const response = await axios.post("http://localhost:3000/login", {
      email: username,
      password: password,
    });
    if (response.status == 200) localStorage.setItem("usuario", username);
  };

  // const handleLogin = async () => {
  //   const response = await axios.post("http://localhost:3000/register", {email: userInput, password: senha})
  //   if (response.status == 201)
  //     localStorage.setItem("usuario", userInput)
  // }

  return (
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
                message: "Por favor, insira o seu usuário!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Usuário"
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
  );
};
export default Login;
