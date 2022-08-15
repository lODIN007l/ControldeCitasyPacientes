import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
const VerCliente = () => {
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

  return cargando ? (
    <Spinner />
  ) : Object.keys(cliente).length === 0 ? (
    <p>No hay Resultados</p>
  ) : (
    <>
      <h1 className="font-black text-4xl text-blue-900">
        Ver Cliente: {cliente.nombre}
      </h1>

      <p className="mt-3">Informacion del cliente </p>
      <p className="text-gray-600 text-2xl mt-10 ">
        <span className="text-gray-800 uppercase font-bold">Cliente:</span>
        {cliente.nombre}
      </p>
      <p className="text-gray-600 text-2xl mt-4 ">
        <span className="text-gray-800 uppercase font-bold">Email:</span>
        {cliente.email}
      </p>
      <p className="text-gray-600 text-2xl mt-4">
        <span className="text-gray-800 uppercase font-bold">Telefono:</span>
        {cliente.telefono}
      </p>
      <p className="text-gray-600 text-2xl mt-4">
        <span className="text-gray-800 uppercase font-bold">Empresa:</span>
        {cliente.empresa}
      </p>
      {cliente.notas && (
        <p className="text-gray-600 text-2xl mt-4">
          <span className="text-gray-800 uppercase font-bold">Notas:</span>
          {cliente.notas}
        </p>
      )}
    </>
  );
};

export default VerCliente;
