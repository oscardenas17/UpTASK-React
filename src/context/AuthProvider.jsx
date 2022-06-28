import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";
//mantiene sesiones de user
import { useNavigate } from "react-router-dom";




const AuthContext = createContext();

const AuthProvider = ( {children} ) => {

    //state para almacenar auth de usuarios
    const [auth, setAuth] = useState( {  } );

    //state para detener un momento la ejecucion al momento de llamar la data del auth en la RutaProtegida
    const [cargando, setCargando] = useState(true);

    const navigate = useNavigate();

    //va a comprobar si hay un token en local storage, para enviarlo al api e intentar autenticar al usuario
    useEffect(() => {  
        const autenticarUsuario = async () =>{
            const token = localStorage.getItem( 'token' );
            //console.log(token);
            if(!token){
                setCargando(false);
                return;
                
            }
            //console.log('si hay token');
            //Intentar autenticar user via JWT
            const config= {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const {data}= await clienteAxios('/usuarios/perfil', config)
                //console.log(data);
                setAuth(data);
                navigate('/proyectos') //si el usuario tiene su sesion ok, ir a proyectos
            } catch (error) {
                //si hay algo previo y expira el token
                setAuth( {} );
            }finally {
                setCargando(false);
            }
           
        }
         return  ()=>autenticarUsuario();
    },[]    );
    
    return(
        <AuthContext.Provider 
            value={ {  
                auth,
                setAuth,
                cargando
             }}
        >
            {children}
        </AuthContext.Provider>
     )
}

export {
    AuthProvider
}

export default AuthContext;