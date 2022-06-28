import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import ConfirmarCuenta from './pages/ConfirmarCuenta';
import Login from './pages/Login';
import NuevoPassword from './pages/NuevoPassword';
import OlvidePassword from './pages/OlvidePassword';
import Registrar from './pages/Registrar';

import { AuthProvider } from './context/AuthProvider';
import { ProyectosProvider } from './context/ProyectosProvider';
import RutaProtegida from './layouts/RutaProtegida';
import Proyectos from './pages/Proyectos';
import NuevoProyecto from './pages/NuevoProyecto';




function App() {

 
  return (
    <BrowserRouter>
     <AuthProvider>
      <ProyectosProvider >
        <Routes>
          <Route path='/' element={ <AuthLayout/> } >
          
          {/* area publica */}
            {/* el index, dice al path del componente principal AuthLayout que es lo que se va cargar */}
            <Route index element={ <Login/> }/>   
            <Route path='registrar'  element={ <Registrar/> }/>

            <Route path='olvide-password'  element={ <OlvidePassword/> }/>
            <Route path='olvide-password/:token'  element={ <NuevoPassword/> }/>
            <Route path='confirmar/:id'  element={ <ConfirmarCuenta/> }/>       

          </Route>

          {/* rutas para area privada, validando inicio de sesion */}
          <Route path='/proyectos' element={ <RutaProtegida/> }>
            <Route index element={ <Proyectos/> } />
            <Route path="crear-proyecto" element={ <NuevoProyecto/> }  />
          </Route>  

        </Routes>
      </ProyectosProvider >

    
      
     </AuthProvider>
    </BrowserRouter>
  )
}

export default App
