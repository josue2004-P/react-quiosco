import useQuiosco from "../hooks/useQuiosco"
import Categoria from "./Categoria"

export default function Sidebar() {

  //Trae el dato de el quiosco provider
  const { categorias } = useQuiosco()

  return (
    <aside className="md:w-72">
        <div className="p-4">
          <img 
            className="w-40"
            src="img/logo.svg" alt="" />
        </div>

        <div className="mt-10">
            {categorias.map(categoria => (
              <Categoria
                key={categoria.id}
                categoria={categoria}

              />
            ))}
        </div>

        <div className="my-5 py-5">
          <button 
            type="button"
            className="text-center text-white bg-red-500 w-full p-3 font-bold">
            Cancelar Orden
          </button>
        </div>
    </aside>
  )
}
