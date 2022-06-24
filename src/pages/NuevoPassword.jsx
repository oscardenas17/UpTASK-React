import {Link} from 'react-router-dom'

const NuevoPassword = () => {
  return (
    <>
    <h1 className="text-sky-600 font-black text-6xl capitalize">
      Reestablece tu contraseña y no pierdas acceso a tus{" "}
      <span className="text-slate-700">proyectos</span>
    </h1>

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