import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Spinner from "../components/Spinner";
import Alerta from "./Alerta";
//para redirigir
import { useNavigate } from "react-router-dom";

const Formulario = ({ cliente, cargando }) => {
  const navegar = useNavigate();

  //validacion mediante un esquema empleando Yup
  const nuevoClienteSquema = Yup.object().shape({
    nombre: Yup.string()
      .min(3, "El nombre es muy corto")
      .max(20, "El nombre es muy largo")
      .required("El nombre del cliente es Obligatorio"),
    empresa: Yup.string().required("El nombre de la empresa es obligatrio"),
    email: Yup.string()
      .email("Email no valido")
      .required("El email es olbigatorio"),
    telefono: Yup.number()
      .integer("Numero no valido")
      .positive("Numero no valido")
      .typeError("El numero no es valido"),
    notas: "",
  });

  const hnndleSubmit = async (valores) => {
    // console.log(valores);

    try {
      const url = "http://localhost:4000/clientes";
      const respuesta = await fetch(url, {
        method: "POST",
        body: JSON.stringify(valores),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resultado = await respuesta.json(respuesta);
      console.log(resultado);
      navegar("/clientes");
    } catch (error) {
      console.log("erorr");
    }
  };

  return cargando ? (
    <Spinner />
  ) : (
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
      <h1 className="text-gray-600 font-bold text-xl uppercase text-center ">
        {cliente?.nombre ? "Editar Cliente " : "Agregar Cliente"}
      </h1>
      <Formik
        initialValues={{
          nombre: cliente?.nombre ?? "",
          empresa: cliente?.empresa ?? "",
          email: cliente?.email ?? "",
          telefono: cliente?.telefono ?? "",
          notas: cliente?.notas ?? "",
        }}
        enableReinitialize={true}
        onSubmit={async (valores, { resetForm }) => {
          await hnndleSubmit(valores);
          resetForm();
        }}
        validationSchema={nuevoClienteSquema}
      >
        {({ errors, touched }) => {
          // console.log(data);
          return (
            <Form className="mt-10">
              <div className="mb-4">
                <label htmlFor="nombre" className="text-gray-800">
                  Nombre :
                </label>
                <Field
                  id="nombre"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Nombre del cliente "
                  name="nombre"
                ></Field>
                {errors.nombre && touched.nombre ? (
                  <Alerta>{errors.nombre}</Alerta>
                ) : null}
              </div>
              <div className="mb-4">
                <label htmlFor="empresa" className="text-gray-800">
                  Empresa :
                </label>
                <Field
                  id="empresa"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Nombre de la empresa "
                  name="empresa"
                ></Field>
                {errors.empresa && touched.empresa ? (
                  <Alerta>{errors.empresa}</Alerta>
                ) : null}
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="text-gray-800">
                  Email :
                </label>
                <Field
                  id="email"
                  type="email"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Email del cliente  "
                  name="email"
                ></Field>
                {errors.email && touched.email ? (
                  <Alerta>{errors.email}</Alerta>
                ) : null}
              </div>
              <div className="mb-4">
                <label htmlFor="telefono" className="text-gray-800">
                  Telefono :
                </label>
                <Field
                  id="telefono"
                  type="tel"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Telefono del cliente  "
                  name="telefono"
                ></Field>
                {errors.telefono && touched.telefono ? (
                  <Alerta>{errors.telefono}</Alerta>
                ) : null}
              </div>
              <div className="mb-4">
                <label htmlFor="notas" className="text-gray-800">
                  Notas :
                </label>
                <Field
                  as="textarea"
                  id="notas"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50 h-40"
                  placeholder="Notas del cliente  "
                  name="notas"
                ></Field>
              </div>
              <input
                type="submit"
                value={cliente?.nombre ? "Editar Cliente " : "Agregar Cliente"}
                className="mt-5 w-full bg-blue-800 p-3 text-white font-bold uppercase text-lg"
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
export default Formulario;
