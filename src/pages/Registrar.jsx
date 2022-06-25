import { useState } from 'react'
import {Link} from 'react-router-dom'
import Alerta from '../components/Alerta'
import axios from 'axios'


const Registrar = () => {

  //state formulario
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [repetirPassword, setRepetirPassword] = useState('')

  //State alertas - inicia como un objeto vacio porque tiene clases de erro y un mensaje
  const [alerta, setAlerta] = useState( {} )

  const handleSubmit = async e => {
    e.preventDefault()
    
    //Validar que los campos contengan data .includes ''  al array
    if ( [nombre, email, password, repetirPassword].includes('') ) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      return//despues de setear la alerte- para que no se continue ejecutando code
    }
    //Validar el password 
    if(password !== repetirPassword){
      setAlerta({
        msg: 'Las contraseñas no son iguales',
        error: true
      })
       return
    }
     //Validar longitud <de> password 
     if(password.length <6){
      setAlerta({
        msg: 'La contraseña debe tener minimo 8 caracteres ',
        error: true
      })
       return
    }   
    setAlerta({}) //Si todo esta bien setAlerta queda como un objeto vacio
    

    //Crear Usuario EN API
    try {
      const {data}= await axios.post( `${import.meta.env.VITE_BACKEND_URL}/api/usuarios`,
        { nombre, email, password })
        setAlerta({
          msg: data.msg,
          error: false,
        })
      //Limpiando campos despues de creado el usuario
      setNombre('')
      setEmail('')
      setPassword('')
      setRepetirPassword('')
      
      //console.log(data.nombre)
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      })
    }
  }

  const {msg} = alerta;
  
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Crea tu cuenta y administra tus{" "}
        <span className="text-slate-700">proyectos</span>
      </h1>

      {msg && <Alerta alerta={alerta}/>}


      <form onSubmit={handleSubmit} className="my-10 bg-white shadow rounded-lg p-10">

      <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="email">Nombre</label>
          <input 
            id="nombre"
            type="text"
            name="nombre" 
            placeholder="Tu Nombre" 
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="email">Email</label>
          <input 
            id="email"
            type="email"
            name="email" 
            placeholder="Email de registro" 
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="password">Password</label>
          <input 
            id="password"
            type="password"
            name="password" 
            placeholder="Password de registro" 
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="password2">Repetir Password</label>
          <input 
            id="password2"
            type="password"
            name="password" 
            placeholder="Repetir tu password" 
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={repetirPassword}
            onChange={(e) => setRepetirPassword(e.target.value)}
          />
        </div>



        <input type="submit" 
            value="Crear Cuenta"
            className="bg-sky-700 w-full mb-5 py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transitios-colors"
        />

      </form>

      
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

export default Registrar