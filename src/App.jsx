import "./App.css";
import Listagem from "./pages/Listagem";
import { AuthProvider } from "./contexts/auth";
import "./main.jsx";

function App() {
  return (
    <>
      <AuthProvider>
        <Listagem />
      </AuthProvider>
    </>
  );
}

export default App;
