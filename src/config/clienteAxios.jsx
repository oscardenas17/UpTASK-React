import axios from "axios";


//baseURL=  http://localhost:4000/api
const clienteAxios = axios.create({
    baseURL: ` ${import.meta.env.VITE_BACKEND_URL}/api`,
})

export default clienteAxios 