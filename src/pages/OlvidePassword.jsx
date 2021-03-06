import clienteAxios from '../config/clienteAxios'
//mport axios from 'axios'

import { useState } from 'react'
import {Link} from 'react-router-dom'
import Alerta from '../components/Alerta'


const OlvidePassword =  () => {

    const [email, setEmail] = useState('')
    const [alerta, setAlerta] =  useState( {} )

    const handleSubmit = async(e)=>{
      e.preventDefault();

      //Validacion de campo email
      if(email === '' || email.length <6){
        setAlerta({
          msg: 'Email obligatorio',
          error: true
        });
        return;
      }

      //envio de mail
     try {
      //const {data} = await clienteAxios.post( `${import.meta.env.VITE_BACKEND_URL}/api/usuarios/olvide-password`,
      const {data} = await clienteAxios.post( `/usuarios/olvide-password`,
      { email })
      setAlerta({
        msg: data.msg,
        error:false,
      });
     // console.log(data)
     } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
          error:true,
      });
     
     }

    }
    const {msg} = alerta;

  return (
    <>
    <h1 className="text-sky-600 font-black text-6xl capitalize">
      Recupera tu acceso y no pierdas tus{" "}
      <span className="text-slate-700">proyectos</span>
    </h1>

    {msg && <Alerta alerta={alerta}/>}

    <form action="" className="my-10 bg-white shadow rounded-lg p-10"
          onSubmit={handleSubmit}
    >

  

      <div className="my-5">
          <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="email">Email</label>
        <input 
          id="email"
          type="email"
          name="email" 
          placeholder="Email de registro" 
          className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          value={ email }
          onChange={ e => setEmail(e.target.value) }
        />
      </div>

     



      <input type="submit" 
          value="Enviar Instrucciones"
          className="bg-sky-700 w-full mb-5 py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transitios-colors"
      />  

    </form>

    <nav className='lg:flex lg:justify-between'>
        <Link
          className='block text-center my-5 text-slate-500 uppercase text-sm'
          to="/"
          >??Ya tienes una cuenta? Inicia Sesi??n
        </Link>

        <Link
            className='block text-center my-5 text-slate-500 uppercase text-sm'
            to="/registrar"
            >Reg??strate
        </Link>

      </nav>
  </>
  )
}

export default OlvidePassword