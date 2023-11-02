import {Outlet} from "react-router-dom"
//Importa el modal de una libreria
import Modal from 'react-modal'
//Importa componente modal
import ModalProducto from "../components/ModalProducto"
//Importar el sidebar creado
import Sidebar from "../components/Sidebar"
//Importar el resumen
import Resumen from "../components/Resumen"
import useQuiosco from "../hooks/useQuiosco"

//importa toasttify
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { useAuth  } from "../hooks/useAuth"

//Estilos del modal
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

//Soluciona error del modal
Modal.setAppElement('#root')

export default  function Layout() {

  useAuth({middleware: 'auth'})
  //Hook
  const { modal } = useQuiosco()

  return (
    <>
    <div className="md:flex">
        
        <Sidebar/>

        <main className="flex-1 h-screen overflow-y-scroll bg-gray-100 p-3">
        <Outlet/>
        </main>

        <Resumen/>

    </div>

      {/* agrega modal si esta depende el estado */}

        <Modal isOpen={modal} style={customStyles}>
          <ModalProducto/>
        </Modal>

        <ToastContainer

          />

        <ToastContainer />
    </>
  )
}
