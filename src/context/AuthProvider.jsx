import { useState, useEffect, createContext } from "react";



const AuthContext = createContext();

const AuthProvider = ( {children} ) => {

    //state para almacenar auth de usuarios
    const [auth, setAuth] = useState( {  } );



    
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