import useSWR from "swr"
import Producto from "../components/Producto"
import useQuiosco from "../hooks/useQuiosco"
import clienteAxios from "../config/axios"

export default function Inicio() {

  //llama al hock
  const { categoriaActual } = useQuiosco()
  //consulta swr LLAMA LA API YCREA UN INERVALO
  const fetcher = () => clienteAxios('/api/productos').then(data => data.data)
  const { data , error , isLoading } = useSWR('/api/productos',fetcher,{
    refreshInterval:1000
  })

  if(isLoading) return 'Cargando...';
  //valida si es la categoria igual al id y muestra los productos de la categoria actual
  const productos = data.data.filter(producto => producto.categoria_id === categoriaActual.id )

  return (
    <>
      <h1 className="text-4xl font-black">{categoriaActual.nombre}</h1>
      <p className="text-2xl my-10">
        Elige y personaliza tu pedido a continuacion.
      </p>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      {productos.map(producto => (
              <Producto
                key={producto.imagen}
                producto={producto}

              />
            ))}
      </div>
    </>
  )
}
