import { Button, Form, Input } from "antd";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [form] = Form.useForm();
  const [nome, setName] = useState("");
  //const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [userInput, setUserInput] = useState("");
  const [result, setResult] = useState("");

  const saveLogin = (login) => {
    localStorage.setItem("login", JSON.stringify(login));
  };

  const handleLogin = () => {
    const login = { nome, userInput, senha };

    const data = localStorage.getItem("login");
    if (data) {
      const data2 = JSON.parse(data);
      const emailData = data2.userInput;
      console.log(data2);
      console.log("emailData", emailData.userInput);

      if (userInput === emailData) {
        alert("email igual");
        setResult("email igual");
      } else {
        saveLogin(login);
        setResult("Valor diferente");
      }
    } else {
      saveLogin(login);
      setResult("não foi encontrado");
    }
  };

  const getLogin = () => {
    const loginString = localStorage.getItem("login");

    return JSON.parse(loginString);
  };

  const infoLogin = getLogin();

  console.log(infoLogin);

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    toast.success("Usuário cadastrado com sucesso!");

    setTimeout(() => {
      window.location.href = "/login";
    }, 3000);
  };
  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
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
        <Input value={userInput} onChange={handleInputChange} />
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
          <a href="/login">Cadastrar</a>
        </Button>
      </Form.Item>

      <ToastContainer />
    </Form>
  );
};
export default Cadastro;
