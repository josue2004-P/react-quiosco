import { Link } from "react-router-dom"
import { createRef, useState } from "react"
import clienteAxios from '../config/axios'
import Alerta from "../components/Alerta";


export default function Login() {

  const emailRef = createRef();
  const passwordRef = createRef();

  const [errores,setErrores] = useState([]);

  const handleSubmit = async e => {
    e.preventDefault();

    const datos = {

      email:emailRef.current.value,
      password:passwordRef.current.value,

    }
    try{
      const {data} = await clienteAxios.post('/api/login',datos)
      console.log(data.token)
    }catch(error){
      setErrores(Object.values(error.response.data.errors))
    }

  }


  return (
    <>
      <h1 className="text-4xl font-black">Inicia Sesion</h1>
      <p>Para crear un pedido inicia sesion</p>

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
          <input 
            type="submit" 
            value="Inicia Sesion" 
            className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"/>
        </form>
      </div>
      <nav className="mt-5">
        <Link to="/auth/register">
          No tienes cuenta? Crea Una
        </Link>
      </nav>
    </>
  )
}
