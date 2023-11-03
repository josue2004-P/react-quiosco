import { useState , useEffect } from 'react';
import useSWR from 'swr'
import clienteAxios from "../config/axios";
import { useNavigate } from 'react-router-dom';

export const useAuth = ()=>{

   const token = localStorage.getItem('AUTH_TOKEN')
   const [loading,setLoading] = useState(true)
   const navigate = useNavigate();

   const fetcher = (url) => clienteAxios(url,{
       headers: {
           Authorization: `Bearer ${token}` 
       }
   }).then(res => res.data);

   const { data: user, error, mutate} = useSWR('/api/user', fetcher);

   useEffect(() => {
       if (error) {
           setLoading(false);
       } else if (user) {
           setLoading(false);
       }
   }, [user, error]);


    const login = async (datos,setErrores) => {

        try{
            const {data} = await clienteAxios.post('/api/login',datos)
            localStorage.setItem('AUTH_TOKEN',data.token);
            setErrores([])
            await mutate()  
            navigate('/');

          }catch(error){
            console.log(error)
            setErrores(Object.values(error.response.data.errors))
          }

    }

    const registro = async (datos,setErrores) => {

        try{
            const {data} = await clienteAxios.post('/api/registro',datos)
            localStorage.setItem('AUTH_TOKEN',data.token);
            setErrores([]);
            await mutate()
          }catch(error){
            setErrores(Object.values(error.response.data.errors))
          }

    }

    const logout = async () => {
        try{
            await clienteAxios.post('/api/logout',null,{
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            })
            localStorage.removeItem('AUTH_TOKEN')
            await mutate(undefined)
        }catch(error){
            throw Error(error?.response?.data?.errors);
        }
    }


    return {
        login,
        registro,
        logout,
        user,
        error,
        loading
    }
}   