import { Button, Form, Input } from "antd";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./Cadastro.css";
import MainLayout from "../../components/MainLayout";
import React from "react";

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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async () => {
    await form.validateFields();

    try {
      const response = await axios.post("http://localhost:3000/register", {
        name: name,
        email: email,
        password: senha,
      });

      if (response.status === 201) {
        toast.success("Usuário cadastrado com sucesso!");

        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error("Email já existe!");
      } else {
        toast.error("Erro: Ocorreu um erro inesperado.");
      }
    }
  };

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <MainLayout>
      <div className="formularioca">
        <img className="logo" src="./nomefacil.png" alt="logo" />
        <div className="formularioCadastro">
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
              <Input value={name} onChange={(e) => setName(e.target.value)} />
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
                  min: 4,
                  message: "Senha muito curta!",
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
              <Button
                className="botaocadastro"
                type="primary"
                htmlType="submit"
                onClick={handleLogin}
              >
                Cadastrar
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <ToastContainer/>
    </MainLayout>
  );
};

export default Cadastro;
