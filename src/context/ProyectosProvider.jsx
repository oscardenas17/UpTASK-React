import { useState, useEffect, createContext } from "react"
import clienteAxios from '../config/clienteAxios'

//Crearl el Context
const ProyectosContext = createContext();

const ProyectosProvider = ( {children} ) => {

  const [proyectos, setProyectos] = useState([]);
  const [alerta, setAlerta] = useState([]);

  const mostrarAlerta= (alerta)=>{
    setAlerta(alerta)

    setTimeout(() => { //elimina la alerta despues de 5 s
      setAlerta({})
    }, 5000);
  }

  //Interactuar con la API para consumir y enviar data de proyectos
  const submitProyecto= async proyecto =>{
    console.log(proyecto); //datos que vienen desde el formProyecto
  }

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