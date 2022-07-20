import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";


//socket
import io from 'socket.io-client' 
let socket;
//socket

//Crearl el Context
const ProyectosContext = createContext();

const ProyectosProvider = ({ children }) => {
  const [proyectos, setProyectos] = useState([]);
  const [alerta, setAlerta] = useState({});
  const [proyecto, setProyecto] = useState({});
  const [cargando, setCargando] = useState(false);
  
  const [modalFormularioTarea, setModalFormularioTarea] = useState(false);

  const navigate = useNavigate();

  //Obtener proyectos para listado
  useEffect(() => {
    const obtenerProyectos = async () => {
      try {
        //EXTRAER TOKENES
        const token = localStorage.getItem("token");
        if (!token) {
          return;
        }

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        //traer proyectos
        const { data } = await clienteAxios("/proyectos", config);
        //console.log(data);
        //colocar en el state los proyectos, usamos el setproyectos
        setProyectos(data);
      } catch (error) {
        console.log(error);
      }
    };
    //return  ()=>
    obtenerProyectos();
  }, []);



  //SOCKET ==========================
    useEffect(() => {
      socket = io(import.meta.env.VITE_BACKEND_URL)
    }, []);

    //SOCKET ==========================


  const mostrarAlerta = (alerta) => {
    setAlerta(alerta);

    setTimeout(() => {
      //elimina la alerta despues de 5 s
      setAlerta({});
    }, 5000);
  };

  //Interactuar con la API para consumir y enviar data de proyectos
  const submitProyecto = async (proyecto) => {
    //console.log(proyecto); //datos que vienen desde el formProyecto

    //mostrar proyecto creado en la lista, copia proyectos actuales con ...proyectos y se añade otro con data

    try {
      //EXTRAER TOKENES
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post("/proyectos", proyecto, config);
      //console.log(data)
      setProyectos([...proyectos, data]);
      setAlerta({
        msg: "Proyecto Creado",
        error: false,
      });

      //redireccionar despues de creado el proyecto
      setTimeout(() => {
        setAlerta({});
        navigate("/proyectos");
      }, 3000);
    } catch (error) {
      console.log(error); //
    }
  };

  //Obtener informacion de un proyecto por su ID - hacer disponible en proyecto para llamarlo
  const obtenerProyecto = async id => {
    //console.log(id);
    setCargando(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      };

      const { data } = await clienteAxios(`/proyectos/${id}`, config);
      //Mostrando Informacion de un proyecto
      setProyecto(data);
      //console.log(data); //con esto hacer disponible proyecto en el provider
      
    } catch (error) {
      console.log(error); //
      // navigate('/proyectos')
      //       setAlerta({
      //           msg: error.response.data.msg,
      //           error: true
      //       })
    } finally {
      setCargando(false); //pasar el cargando disponible para los demas pages
    }
  };

  //Pasar modal
  const handleModalTarea = () => {
    setModalFormularioTarea(!modalFormularioTarea);
   
  };

  //SubmitTarea modal
  const submitTarea = async (tarea) => {
    // console.log(tarea);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      }
      const {data} = await clienteAxios.post('/tareas', tarea, config)
      console.log(data);

      
  //SOCKET ==========================
      socket.emit('nueva tarea', data)      
  //SOCKET ==========================

    } catch (error) {
      console.log(error)
    }
  };

  
  //SOCKET ==========================
    const submitTareasProyecto = (tarea)=>{

    }

  //SOCKET ==========================

  return (
    <ProyectosContext.Provider
      value={{
        proyectos,
        mostrarAlerta,
        alerta,
        submitProyecto,
        obtenerProyecto, //para llamarla en proyecto
        proyecto, //mostrar informacion de un proyecto, se extare en proyecto por el useProyectos
        cargando, //se extrae en proyecto
        modalFormularioTarea, //leer si esta true o false
        handleModalTarea,
        submitTarea,
        submitTareasProyecto
      }}
    >
      {children}
    </ProyectosContext.Provider>
  );
};

export { ProyectosProvider };

export default ProyectosContext;
