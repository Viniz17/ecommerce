import { Button, Form, Input } from "antd";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

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

  // const handleLogin = () => {
  //   const login = { nome, userInput, senha };

  //   const data = localStorage.getItem("login");
  //   if (data) {
  //     const data2 = JSON.parse(data);
  //     const emailData = data2.userInput;

  //     if (userInput === emailData) {
  //       toast.error("Este email já está cadastrado!");
  //       setResult("Email já existente.");
  //     } else {
  //       toast.success("Usuário cadastrado com sucesso!");
  //       saveLogin(login);
  //       setResult("Email válido.");
  //       setTimeout(() => {
  //         window.location.href = "/login";
  //       }, 3000);
  //     }
  //   } else {
  //     saveLogin(login);
  //     setResult("Email não existe em nossa biblioteca.");
  //   }
  // };

  const handleLogin = async () => {
    const response = await axios.post("http://localhost:3000/register", {email: userInput, password: senha})
    if (response.status == 201)
      localStorage.setItem("usuario", userInput)
  } 

  const getLogin = () => {
    const loginString = localStorage.getItem("login");

    return JSON.parse(loginString);
  };

  const infoLogin = getLogin();

  console.log(infoLogin);

  // const onFinish = () => {
  //   setTimeout(() => {
  //     window.location.href = "/login";
  //   }, 3000);
  // };
  const handleInputChange = (e) => {
    setUserInput(e.target.value);
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
          Cadastrar
        </Button>
      </Form.Item>

      <ToastContainer />
    </Form>
  );
};
export default Cadastro;
