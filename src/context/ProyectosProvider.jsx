import { useState, useEffect, createContext } from "react"
import clienteAxios from '../config/clienteAxios'
import {useNavigate} from 'react-router-dom'

//Crearl el Context
const ProyectosContext = createContext();

const ProyectosProvider = ( {children} ) => {

  const [proyectos, setProyectos] = useState([]);
  const [alerta, setAlerta] = useState([]);

  const navigate = useNavigate();

  const mostrarAlerta= (alerta)=>{
    setAlerta(alerta)

    setTimeout(() => { //elimina la alerta despues de 5 s
      setAlerta({})
    }, 5000);
  }

  //Interactuar con la API para consumir y enviar data de proyectos
  const submitProyecto= async proyecto =>{
    //console.log(proyecto); //datos que vienen desde el formProyecto
    try {
      //EXTRAER TOKENES
      const token = localStorage. getItem('token');
      if(!token){return} 

      const config = {
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
         },
      };

      const {data} = await clienteAxios.post('/proyectos', proyecto, config)
      console.log(data)

      setAlerta({
        msg: 'Proyecto Creado',
        error: false
      });

      //redireccionar despues de creado el proyecto
      setTimeout(() => {
        setAlerta({})
        navigate('/proyectos')
      }, 3000);
    } catch (error) {
      console.log(error); //
    }
  };

  return (
    <ProyectosContext.Provider 
      value={{ 
        proyectos,
        mostrarAlerta,
        alerta,
        submitProyecto
       }}
    >
      {children}
    </ProyectosContext.Provider >
  )
}

export { 
  ProyectosProvider
}

export default ProyectosContext