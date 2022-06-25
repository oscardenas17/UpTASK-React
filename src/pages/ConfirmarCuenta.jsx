import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Alerta from "../components/Alerta";


const ConfirmarCuenta = () => {

const [alerta, setAlerta] = useState({});

  const params = useParams();    // console.log(params)
  const {id} = params;
  
  //UseEffect para peticion a backend
  useEffect(() => {
    const confirmarCuenta = async()=>{
      try {
        const url = `http://localhost:4000/api/usuarios/confirmar/${id}`
        const {data} = await axios.get(url);  //  console.log(data);
        setAlerta( { 
          msg: data.msg,
          error:false
         })
      
      } catch (error) {
        
        const newAlert = { 
          msg: error.response.data.msg,
          error:true,
        }
        setAlerta(newAlert)
      }
    }
    return () => { confirmarCuenta() };
  }, []);
const {msg} = alerta  // se extrae el msg para el retorno en div


  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Confirma tu cuenta y comienza a crear tus {" "}
        <span className="text-slate-700">proyectos</span>
      </h1>

      <div>
        {msg && <Alerta alerta={alerta} />}
      </div>
    </>
  );
};

export default ConfirmarCuenta;
