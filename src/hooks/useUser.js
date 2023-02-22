import {useCallback, useContext} from 'react'
import Context from "../context/UserContext";

export default function useUser(params) {
    const {jwt, setJWT} = useContext(Context)

    const login = useCallback(({username, password})=>{
        console.log(username, password)
        if(username === "root")
            setJWT('test')
        // estado(true)
    },[setJWT])
    
    const logout = useCallback(()=>{
        setJWT(null)
    },[setJWT])

    return{
        isLogged : Boolean(jwt),
        login,
        logout
    }
}