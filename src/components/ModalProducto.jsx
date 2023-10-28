import { useState,useEffect } from 'react'
import {formatearDinero} from '../helpers/index'
import useQuiosco from "../hooks/useQuiosco"

export default function ModalProducto() {

    //Trae funcion cerrar y los datos 
    const { producto, handleClickModal,handleAgregarPedido,pedido } = useQuiosco()

    //Cantidades
    const [cantidad,setCantidad] = useState(1)

    //Edicion
    const [edicion,setEdicion] = useState(false)

    useEffect(()=>{
        if(pedido.some( pedidoState => pedidoState.id === producto.id )){
            const productoEdicion = pedido.filter( pedidoState => pedidoState.id === producto.id)[0]
            setCantidad(productoEdicion.cantidad)
            setEdicion(true)
        }
    },[pedido])

  return (
    <div className="md:flex items-center gap-10">
        <div className="md:w-1/3">
            <img 
                src={`/img/${producto.imagen}.jpg`} 
                alt={`Imagen producto ${producto.imagen}`} 
            />
        </div>
        <div className="md:w-2/3">
            <div className="flex justify-end">
                <button type="button" onClick={handleClickModal}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>  
                </button>
            </div>
            <h1 className="text-3xl font-bold mt-5">{producto.nombre}</h1>
            <p className="mt-5 font-black text-5xl text-amber-500">
                {formatearDinero(producto.precio)}
            </p>

            <div className='flex gap-4 mt-5'>
                <button 
                    type='button'
                    onClick={()=>{
                        if(cantidad <= 1 ) return
                        setCantidad(cantidad-1)
                    }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
                    </svg>
                </button>

                <p className='text-3xl'>{cantidad}</p>

                <button
                    type='button'
                    onClick={()=>{
                    if(cantidad >= 5 ) return
                    setCantidad(cantidad+1)
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </button>
            </div>

            <button type='button' 
            className='bg-indigo-600 hover:bg-indigo-800 px-5 py-2 mt-5 text-white font-bold uppercase rounded'
             onClick={() => {
                handleAgregarPedido({...producto,cantidad}) //Agrega el pedido la mete en un solo objeto
                handleClickModal()//cierra modal
            }} //une objeto
            >
                {edicion ? 'Guardar cambios ' : 'Añadir al pedido'}
            </button>
        </div>
    </div>
  )
}
