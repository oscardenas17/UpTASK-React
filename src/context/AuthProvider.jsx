import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";




const AuthContext = createContext();

const AuthProvider = ( {children} ) => {

    //state para almacenar auth de usuarios
    const [auth, setAuth] = useState( {  } );

    //va a comprobar si hay un token en local storage
    useEffect(() => {  
        const autenticarUsuario = async () =>{
            const token = localStorage.getItem( 'token' );
            //console.log(token);
            if(!token){
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
            } catch (error) {
                
            }
        }
         return  ()=>autenticarUsuario();
    },[]    );
    
    return(
        <AuthContext.Provider 
            value={ {  
                setAuth
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