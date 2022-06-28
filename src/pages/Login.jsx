import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import Alerta from '../components/Alerta';
import clienteAxios from '../config/clienteAxios';

import useAuth from '../hooks/useAuth';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState( {} );

  const { setAuth} = useAuth();
  console.log(auth);
  console.log(cargando);

  const handleSubmit = async e=>{
    e.preventDefault();

    if ([email, password].includes('') ){
      setAlerta( {
        msg: 'Todos los campos son obligatorios',
        error: true,
      } )

      return;
    };

    try {
      const {data} = await clienteAxios.post('/usuarios/login', {email, password} ) 
      setAlerta( {} )
      localStorage.setItem('token', data.token)

      //context de logeo de usuario
      setAuth(data)
      //console.log(data);

    } catch (error) {
      setAlerta( {
        msg: error.response.data.msg,
        error: true,
      } )
     
    }

  };

    const {msg} = alerta

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Inicia Sesión y administra tus{" "}
        <span className="text-slate-700">proyectos</span>
      </h1>

        {msg && <Alerta alerta={alerta} />}

      <form action="" className="my-10 bg-white shadow rounded-lg p-10"  onSubmit={handleSubmit}>
        <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="email">Email</label>
          <input 
            id="email"
            type="email"
            name="email" 
            placeholder="Email de registro" 
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={email}
           onChange={ e => setEmail(e.target.value) }
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
           onChange={ e => setPassword(e.target.value) }
          />
        </div>


        <input type="submit" 
            value="Iniciar Sesión"
            className="bg-sky-700 w-full mb-5 py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transitios-colors"
        />       

      </form>

      <nav className='lg:flex lg:justify-between'>
          <Link
            className='block text-center my-5 text-slate-500 uppercase text-sm'
            to="/registrar"
          >Regístrate</Link>

          <Link
            className='block text-center my-5 text-slate-500 uppercase text-sm'
            to="/olvide-password"
          >Olvide Mi Contraseña</Link>
        </nav>
    </>
  );
};

export default Login;
