import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout/Layout";
import AuthLayout from "./layout/AuthLayout"
import Inicio from "./views/Inicio";
import Login from "./views/Login";
import Register from "./views/Register"

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children:[
            {
                index:true, //VISALIZA 
                element: <Inicio/>
            }
        ]
    },
    {
        path: '/auth',
        element: <AuthLayout/>,
        children:[
            {
                path:"/auth/login", //Visualiza por ruta
                element: <Login/>
            },
            {
                path:"/auth/register", //Visualiza por ruta
                element: <Register/>
            }
        ]
    }
])

export default router