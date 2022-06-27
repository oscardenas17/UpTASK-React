import { useEffect } from 'react'
import { useState } from 'react'
import {Link, useParams} from 'react-router-dom'
import axios from 'axios'
import Alerta from '../components/Alerta'


const NuevoPassword = () => {

  const params = useParams();
  //console.log(params)
  const {token} =params

  const [tokenValido, setTokenValido] = useState(false);
  const [alerta, setAlerta] = useState( {} )

useEffect(() => {

  const comprobarToken = async ()=>{
    try {
      const {data} = await axios.get(`http://localhost:4000/api/usuarios/olvide-password/${token}`)
      setTokenValido(true) //si token es válido, muestra el formulario
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error:true,
    })
    }
  };

  comprobarToken();
}, []);

const {msg} = alerta;

  
  

  return (
    <>
    <h1 className="text-sky-600 font-black text-6xl capitalize">
      Reestablece tu contraseña y no pierdas acceso a tus{" "}
      <span className="text-slate-700">proyectos</span>
    </h1>

    {msg  && <Alerta alerta={alerta}/>}

{/* Token valido */}
   { tokenValido && (
       <form action="" className="my-10 bg-white shadow rounded-lg p-10">

    
       <div className="my-5">
           <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="password">Nueva Contraseña</label>
         <input 
           id="password"
           type="password"
           name="password" 
           placeholder="Escribe tu nueva contraseña" 
           className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
         />
       </div>
 
   
       <input type="submit" 
           value="Guardar Nuevo Password"
           className="bg-sky-700 w-full mb-5 py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transitios-colors"
       />     
 
     </form>
   )}

    <nav className='lg:flex lg:justify-between'>
        <Link
          className='block text-center my-5 text-slate-500 uppercase text-sm'
          to="/"
        >¿Ya tienes una cuenta? Inicia Sesión</Link>

        <Link
          className='block text-center my-5 text-slate-500 uppercase text-sm'
          to="/olvide-password"
        >Olvide Mi Contraseña</Link>
      </nav>
  </>
  )
}

export default NuevoPassword