import { useState } from "react"
import useProyectos from "../hooks/useProyectos";
import Alerta from "./Alerta";



const FormularioProyecto = () => {

    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fechaEntrega, setFechaEntrega] = useState('');
    const [cliente, setCliente] = useState('');

    const {mostrarAlerta, alerta, submitProyecto} = useProyectos();

    const handleSubmit =(e)=>{
        e.preventDefault();
        
        
        if([nombre, descripcion, fechaEntrega, cliente].includes('')){
            mostrarAlerta({
                msg:'Todos los campos son obligatorios',
                error:  true

            })
            return
        }
        
    //Pasar los datos hacia el Provider
    submitProyecto({nombre,descripcion,fechaEntrega,cliente})
    } 

    const {msg} = alerta  //se extrae el msg de alerta del state

  return (

  

    <form 
        className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow"
        onSubmit={handleSubmit}
    >

        {/* //Mostrar la alerta */}
       {msg &&  <Alerta alerta={alerta} />}

        <div className="mb-5">
            <label htmlFor="nombre"
                    className="text-gray-700 uppercase font-bold text-sm"
            >
                Nombre Proyecto
            </label>
            <input type="text"
                    id="nombre"
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
                    placeholder="Nombre Proyecto"  
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
            />
        </div>

        <div className="mb-5">
            <label htmlFor="descripcion"
                    className="text-gray-700 uppercase font-bold text-sm"
            >
                Descripción
            </label>
            <textarea id="descripcion"
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
                    placeholder="Descripcion Proyecto"  
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
            />
        </div>

        <div className="mb-5">
            <label htmlFor="fecha-entrega"
                    className="text-gray-700 uppercase font-bold text-sm"
            >
                Fecha Entrega
            </label>
            <input type="date"
                    id="fecha-entrega"
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
                    value={fechaEntrega}
                    onChange={(e) => setFechaEntrega(e.target.value)}
            />
        </div>

        
        <div className="mb-5">
            <label htmlFor="cliente"
                    className="text-gray-700 uppercase font-bold text-sm"
            >
                Nombre Cliente
            </label>
            <input type="text"
                    id="cliente"
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
                    placeholder="Nombre del cliente"  
                    value={cliente}
                    onChange={(e) => setCliente(e.target.value)}
            />
        </div>

        <input 
            type="submit"
            value="Crear Proyecto"
            className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"

        
        />


    </form>
  )
}

export default FormularioProyecto