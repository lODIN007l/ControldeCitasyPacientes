import { BrowserRouter, Routes, Route } from "react-router-dom";
import IniciarSesion from "./layout/IniciarSession";
import Layout from "./layout/Layout";
import Inicio from "./pages/Inicio";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IniciarSesion />}></Route>
        <Route path="/clientes" element={<Layout />}>
          <Route element={Inicio} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
