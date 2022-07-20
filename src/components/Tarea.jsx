import React from "react";
import { formatearFecha } from "../helpers/formatearFecha"

const Tarea = ({ tarea }) => {
  const { descripcion, nombre, prioridad, fechaEntrega, _id, estado } = tarea;

  return (
    <div className="border-p p-5 flex justify-between items-center">
      <div className="flex flex-col  items-start">
        <p className="mb-1 text-xl">{nombre}</p>
        <p className="mb-1 text-sm text-gray-500">{descripcion}</p>
        <p className="mb-1 text-sm">{ formatearFecha(fechaEntrega) }</p>
        <p className="mb-1 text-gray">Prioridad: {prioridad}</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-2">
        <button
          className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
          onClick={() => handleModalEditarTarea(tarea)}
        >
          Editar
        </button>

        <button
          className={`${
            estado ? "bg-sky-600" : "bg-gray-600"
          } px-4 py-3 text-white uppercase font-bold text-sm rounded-lg`}
          onClick={() => completarTarea(_id)}
        >
          {estado ? "Completa" : "Incompleta"}
        </button>

        <button
          className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
          onClick={() => handleModalEliminarTarea(tarea)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default Tarea;
