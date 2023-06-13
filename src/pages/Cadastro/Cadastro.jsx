import { Button, Form, Input } from "antd";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
const Cadastro = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [nome, setName] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async () => {
    const response = await axios.post("http://localhost:3000/register", {
      email: email,
      password: senha,
    });
    if (response.status == 201) {
      toast.success("Usuário cadastrado com sucesso!");

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  };

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      style={{
        maxWidth: 600,
      }}
      scrollToFirstError
    >
      <Form.Item
        name="name"
        label="Usuário"
        tooltip="Como você gosta que os outros te chamem?"
        rules={[
          {
            required: true,
            message: "Por favor, digite seu nome de usuário!",
            whitespace: true,
          },
        ]}
      >
        <Input value={nome} onChange={(e) => setName(e.target.value)} />
      </Form.Item>
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: "email",
            message: "O E-mail não é valido!",
          },
          {
            required: true,
            message: "Por favor, digite seu E-mail!",
          },
        ]}
      >
        <Input value={email} onChange={handleInputChange} />
      </Form.Item>

      <Form.Item
        name="senha"
        label="Senha"
        rules={[
          {
            required: true,
            message: "Digite sua senha!",
          },
        ]}
        hasFeedback
      >
        <Input.Password value={senha} onChange={(e) => setSenha(e.target.value)} />
      </Form.Item>

      <Form.Item
        name="confirme"
        label="Confirmar"
        dependencies={["Senha"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Por favor, confirme sua senha!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("senha") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("A nova senha não coincide!"));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit" onClick={handleLogin}>
          Cadastrar
        </Button>
      </Form.Item>

      <ToastContainer />
    </Form>
  );
};
export default Cadastro;
