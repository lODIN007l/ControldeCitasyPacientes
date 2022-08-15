import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Formulario from "../components/Formulario";
const EditarCliente = () => {
  const { id } = useParams();
  const [cliente, setCliente] = useState({});
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const obtenerClienteApi = async () => {
      setCargando(!cargando);
      try {
        const url = `http://localhost:4000/clientes/${id}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        setCliente(resultado);
      } catch (error) {
        console.log(error);
      }
      setCargando(false);
    };
    obtenerClienteApi();
  }, []);

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
      <p className="mt-3">Utiliza este formulario para editar el cliente </p>
      {cliente?.nombre ? (
        <Formulario cliente={cliente} cargando={cargando} />
      ) : (
        <p className="font-black text-4xl text-blue-900 mt-auto text-center">
          Sin resultados
        </p>
      )}
    </>
  );
};

export default EditarCliente;
