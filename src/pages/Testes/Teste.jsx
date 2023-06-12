import { useState, useEffect } from "react";

const Teste = () => {
  const [Info, setInfo] = useState({ nome: "", email: "", senha: "" });
  const [listaUsuarios, setListaUsuarios] = useState([]);

  // const inputNome = useRef();
  // const inputEmail = useRef();
  // const inputSenha = useRef();

  // const definirNome = (e) => {
  //   setInfo({ ...Info, nome: e.target.value });
  // };
  // const definirEmail = (e) => {
  //   setInfo({ ...Info, email: e.target.value });
  // };
  // const definirSenha = (e) => {
  //   setInfo({ ...Info, senha: e.target.value });
  // };

  // const armazenar = (chave, valor) => {
  //   localStorage.setItem(chave, valor);
  // };

  //carrega infos do localstorage se existirem
  useEffect(() => {
    if (localStorage.getItem("info_usuarios") !== null) {
      setListaUsuarios(JSON.parse(localStorage.getItem("info_usuarios")));
    }
  }, []);

  //atualiza as infos do usuario no localstorage
  useEffect(() => {
    localStorage.setItem("infos_usuario", JSON.stringify(listaUsuarios));
  }, [listaUsuarios]);

  // setListaUsuarios([...listaUsuarios, Info]);

  // const consultar =(chave) => {
  //   alert(localStorage.getItem(chave))
  // }

  // const apagar = (chave)=>{
  //   localStorage.removeItem(chave)
  // }

  return (
    <>
      <label>
        Digite um nome
        <input type="text" value={Info.nome} onChange={(e) => setInfo(e.target.value)} />
        <br />
      </label>
      <label>
        Digite um email
        <input type="text" value={Info.email} onChange={(e) => setInfo(e.target.value)} />
        <br />
      </label>
      <label>
        Digite uma senha
        <input type="text" value={Info.senha} onChange={(e) => setInfo(e.target.value)} />
        <br />
        <button onClick={() => setInfo("ls_senha", Info)}>Registrar usuário</button>
      </label>
    </>
  );
};

export default Teste;
