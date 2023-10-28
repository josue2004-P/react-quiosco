import { createContext, useState,useEffect } from "react";
import axios from "axios";
import clienteAxios from "../config/axios";

//importat toast

import { toast } from "react-toastify";

const QuioscoContext = createContext();

const QuioscoProvider = ({children}) => {

    //Toma todass las categorias ------      INICIA CON AGREGLO VACIO
    const [categorias, setCategorias] = useState([])
    //Muestra la categoria actual ------- INICIA CON OBJETO VACIO
    const [categoriaActual, setCategoriaActual] = useState({})
    //Setmodal
    const [modal, setModal] = useState(false)
    //Producto
    const [producto, setProducto] = useState({})
    //PEDIDO
    const [pedido,setPedido] = useState([]);

    //Total
    const[total,setTotal] = useState(0)

    useEffect(() =>{
        //funcion calcular el total al momento que cambie el pedido
        const nuevoTotal = pedido.reduce( (total,producto) => (producto.precio * producto.cantidad) + total,0)
        setTotal(nuevoTotal)

    },[pedido])

    //Funcion toma de api      ***************************
    const obtenerCategorias = async () => {
        try{
            //LLAMA ALA VARIABLE DE ENTORNO
            const {data}= await clienteAxios('/api/categorias');
            setCategorias(data.data)
            setCategoriaActual(data.data[0])
        }catch(error){
            console.log(error)
        }
    }

    //USE EFECT PARA CATEGORIAS
    useEffect(() => {
        obtenerCategorias();
    },[])

 
    //Funcion al dar click se seleccione la cateforia y cambia la categoria actual
    const handleClickCategoria = id => {
        
        const categoria = categorias.filter(categoria => categoria.id === id)[0]
        setCategoriaActual(categoria)
    }

    //funcion para cerrar y abrir modal
    const handleClickModal = () => {

        setModal(!modal)
    }

    //Funcion para el producto
    const handleSetProducto = producto => {
        setProducto(producto)
    }

    //agregar pedido            elimina                 lo pasa

    const handleAgregarPedido = ({categoria_id,...producto})=> {

        if(pedido.some( pedidoState => pedidoState.id === producto.id )){
            const pedidoActualizado = pedido.map( pedidoState => pedidoState.id === producto.id ? producto : pedidoState)
            setPedido(pedidoActualizado)
            toast.success('Actualizado correctamente')
        }else{
            setPedido([...pedido,producto]) //toma copia y agrega el producto
            toast.success('Agregado pedido')
        }
    }

    //Editar cantidad

    const handleEditarCantidad = id => {
        const productoActualizar = pedido.filter(producto => producto.id === id)[0]
        setProducto(productoActualizar)
        setModal(!modal)
    }

    //eliminar

    const handleEliminarProducto = id => {
        const pedidoActualizado = pedido.filter(producto => producto.id !== id)   
        setPedido(pedidoActualizado)
        toast.success('Eliminado del pedido')
    }

    return(

        // crear el context para ser pasado

        <QuioscoContext.Provider
            value={{
                
                // pasa parametros por el context para ser tomados por otros archivos
                categorias,
                categoriaActual,
                handleClickCategoria,
                //Pasa modal funciones
                modal, 
                handleClickModal,
                //pasa los productos
                producto,
                handleSetProducto,
                //pasa pedido
                pedido,
                //Pasa agregar pedido
                handleAgregarPedido,
                //Pasa funcion editar pedido
                handleEditarCantidad,
                //Paaa eliminar del pedido
                handleEliminarProducto,
                //pasa total
                total

            }}
            >{children}
        </QuioscoContext.Provider>
    )
}

export {

    //Pasa el context para poner el el main
    QuioscoProvider
}

export default QuioscoContext