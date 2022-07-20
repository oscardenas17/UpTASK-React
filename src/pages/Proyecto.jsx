import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useProyectos from "../hooks/useProyectos";
import ModalFormularioTarea from "../components/ModalFormularioTarea";
import Tarea from "../components/Tarea";

//SOCKET
import io from 'socket.io-client'
let socket;
//SOCKET


const Proyecto = () => {
  const params = useParams();
 //console.log(params.id) 

  const { obtenerProyecto, proyecto, cargando, handleModalTarea, submitTareasProyecto } = useProyectos()
console.log('proyecto.tareas',proyecto.nombre)
  const [modal, setModal] = useState(false);

  useEffect(() => {
   obtenerProyecto(params.id);   
  }, []);

  //SOCKET
  useEffect(() => {
    socket= io(import.meta.env.VITE_BACKEND_URL)
    socket.emit('abrir proyecto', params.id)
  }, []);


  useEffect(() => {
    socket.on('tarea agregada', tareaNueva=>{
      console.log('se recibe sokcet nueva tgarea',tareaNueva)
      submitTareasProyecto(tareaNueva)
    })
  }, []);

  //SOCKET

   

  const { nombre } = proyecto;
  console.log('validar', proyecto)
  if(cargando) return 'Cargando...'
 console.log('proyuecti',proyecto.nombre)

 return  (
  <>
    <div className='flex justify-between'>
      <h1 className='font-black text-4xl'>{nombre}</h1>
    </div>
    
    
      <button
      // llamar modal
      onClick={ handleModalTarea}
        type="button"
        className="text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-sky-400 text-white text-center mt-5 flex gap-2 items-center justify-center "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
            clipRule="evenodd"
          />
        </svg>
        Nueva tarea
      </button>

      <p className="font-bold text-xl mt-10"> Tareas del Proyecto</p>

      <div className="bg-white shadow mt-10 rounded-lg">
        
        {
          proyecto.tareas?.length ? 
          proyecto.tareas?.map( tarea =>(
            <Tarea
              key={tarea._id}
              tarea={tarea}
            />  
          )
       ) :
         <p className="text-center my-5 p-10">No hay Tareas en este proyecto</p> 
       }

      </div>

      <ModalFormularioTarea
        modal={modal}
        setModal={setModal} 
      />
   

  </>
    )

}

export default Proyecto
