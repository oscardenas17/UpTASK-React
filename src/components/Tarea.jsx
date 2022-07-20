import React from 'react'

const Tarea = ( {tarea} ) => {

    const { descripcion, nombre, prioridad, fechaEntrega, _id} = tarea
    console.log('tarea',nombre);
    return (
    <div className='border-p p-5 flex justify-between items-center'>
        <div >
            <p className='mb-1 text-xl'>{nombre}</p>
            <p className='mb-1 text-sm text-gray-500'>{descripcion}</p>
            <p className='mb-1 text-gray'>Prioridad: {prioridad}</p>
            <p className='mb-1 text-xl'>{fechaEntrega}</p>
        </div>

        <div>

        </div>

    </div>
  )
}

export default Tarea