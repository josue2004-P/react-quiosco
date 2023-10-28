import { useContext } from "react"
import QuioscoContext from '../context/QuioscoProvider'

//Hock para tomar el context 

const useQuiosco = () => {
    return useContext(QuioscoContext)
}

export default useQuiosco