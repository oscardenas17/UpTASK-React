import { useEffect } from "react";
import {  useParams} from "react-router-dom";
import useProyectos from "../hooks/useProyectos";



const Proyecto = () => {
  const params = useParams();
  //console.log(params)

  const {obtenerProyecto} =useProyectos();

  useEffect(() => {
   return()=> obtenerProyecto(params.id)
  }, []);

  return (
    <div>Proyecto</div>
  )
}

export default Proyecto