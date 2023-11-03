import { createBrowserRouter,Routes,Route,HashRouter,BrowserRouter } from "react-router-dom";
import Layout from "./layout/Layout";
import AuthLayout from "./layout/AuthLayout"
import Inicio from "./views/Inicio";
import Login from "./views/Login";
import Register from "./views/Register"
import AdminLayout from "./layout/AdminLayout";
import Ordenes from "./views/Ordenes";
import Productos from "./views/Productos";
import {ProtectedRoute} from './hooks/ProtectedRoute'
import { QuioscoProvider } from './context/QuioscoProvider'

// const router = createBrowserRouter([
//     {
//         path: '/',
//         element: <ProtectedRoute/>,
//         children:[
//             {
//                 path: '/',
//                 element: <Layout/>,
//                 children:[
//                     {
//                         index: true, //Visualiza por ruta
//                         element: <Inicio/>
//                     },
//                 ]
//             },
//       ]
//     },
//     {
//         path: '/auth',
//         element: <AuthLayout/>,
//         children:[
//             {
//                 path:"/auth/login", //Visualiza por ruta
//                 element: <Login/>
//             },
//             {
//                 path:"/auth/register", //Visualiza por ruta
//                 element: <Register/>
//             }
//         ]
//     },
//     {
//         path: '/admin',
//         element: <AdminLayout/>,
//         children:[
//             {
//                 index:true, //VISALIZA 
//                 element: <Ordenes/>
//             },
//             {
//                 path: '/admin/productos',
//                 element: <Productos/>
//             }
//         ]
//     }
// ])

// export default router

function App() {
    return (


        <BrowserRouter>
            <QuioscoProvider>
            <Routes>
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Inicio/>}/>

              </Route>
  
              <Route path="/auth/login" element={<Login />} />
            
  
            </Routes>
        </QuioscoProvider>


        </BrowserRouter>

    );
  }
  
  export default App;