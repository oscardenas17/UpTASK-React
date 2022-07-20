import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useProyectos from "../hooks/useProyectos";
import ModalFormularioTarea from "../components/ModalFormularioTarea";

const Proyecto = () => {
  const params = useParams();
  //console.log(params)

  const { obtenerProyecto, proyecto, cargando, handleModalTarea } = useProyectos();

  const [modal, setModal] = useState(false);

  useEffect(() => {
    return () => obtenerProyecto(params.id);
  }, []);
  console.log(proyecto.nombre);

  const { nombre } = proyecto;
  console.log(nombre);
  return cargando ? (
    "..."
  ) : (
    <div>
      <h1 className="font-black text-4xl">{nombre}</h1>

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


      <ModalFormularioTarea
        modal={modal}
        setModal={setModal} 
      />
    </div>
  );
};

export default Proyecto;
