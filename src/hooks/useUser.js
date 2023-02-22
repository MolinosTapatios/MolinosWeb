import {useCallback, useContext} from 'react'
import Context from "../context/UserContext";
import loginService from 'services/login';
import { useState } from 'react';

export default function useUser(params) {

    const {jwt, setJWT} = useContext(Context)
    const [estado, setEstado] = useState({error:false, loading:false})

    const login = useCallback(({username, password})=>{
        setEstado({loading:true, error:false})
        loginService({user:username,password:password})
        .then(resp => {
            console.log(resp)
            if(resp.flag){
                setJWT(resp)
            }else{
                setEstado({error:resp.msg})
            }
        })
        setEstado({loading:false})
    },[setJWT])
    
    const logout = useCallback(()=>{
        setJWT(null)
    },[setJWT])

    return{
        isLogged : Boolean(jwt),
        login,
        loading : estado.loading,
        error : estado.error,
        logout
    }
}