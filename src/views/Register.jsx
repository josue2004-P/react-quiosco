import { Link } from "react-router-dom"
import { createRef, useState } from "react"
import clienteAxios from '../config/axios'
import Alerta from "../components/Alerta";

export default function Register() {

  const nameRef = createRef();
  const emailRef = createRef();
  const passwordRef = createRef();
  const passwordConfirmationRef = createRef();

  const [errores,setErrores] = useState([]);

  const handleSubmit = async e => {
    e.preventDefault();

    const datos = {
      name:nameRef.current.value,
      email:emailRef.current.value,
      password:passwordRef.current.value,
      password_confirmation:passwordConfirmationRef.current.value,
    }
    try{
      const {data} = await clienteAxios.post('/api/registro',datos)
      console.log(data.token)
    }catch(error){
      setErrores(Object.values(error.response.data.errors))
    }

  }


  return (
    <>
      <h1 className="text-4xl font-black">Crea Tu Cuenta</h1>
      <p>Crea tu Cuenta llenando el formulario</p>

      <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
        <form
          onSubmit={handleSubmit}
          noValidate
        >

          {errores ? errores.map(error => <Alerta key={error} > {error} </Alerta> ) : null}

        <div className="mb-4">
            <label 
              className="text-slate-800"
              htmlFor="" >
              Nombre
            </label>
            <input 
              type="text"
              id="name"
              className="mt-2 w-full p-3 bg-gray-50"
              placeholder="Tu nombre"
              name="name"
              ref={nameRef}
             />
          </div>
          <div className="mb-4">
            <label 
              className="text-slate-800"
              htmlFor="" >
              Email
            </label>
            <input 
              type="text"
              id="email"
              className="mt-2 w-full p-3 bg-gray-50"
              placeholder="Tu email"
              name="email"
              ref={emailRef}
             />
          </div>
          <div className="mb-4">
            <label 
              className="text-slate-800"
              htmlFor="password" >
              Password
            </label>
            <input 
              type="password"
              id="password"
              className="mt-2 w-full p-3 bg-gray-50"
              placeholder="Tu password"
              name="password"
              ref={passwordRef}
             />
          </div>
          <div className="mb-4">
            <label 
              className="text-slate-800"
              htmlFor="password_confirm" >
              Repetir Password
            </label>
            <input 
              type="password"
              id="password_confirmation"
              className="mt-2 w-full p-3 bg-gray-50"
              name="password_confirmation"
              placeholder="Repetir password"
              ref={passwordConfirmationRef}
             />
          </div>
          <input 
            type="submit" 
            value="Crear Cuenta" 
            className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"/>
        </form>
      </div>
      <nav className="mt-5">
        <Link to="/auth/login">
          Ya tienes cuenta? Inicia Sesion
        </Link>
      </nav>
    </>
  )
}
