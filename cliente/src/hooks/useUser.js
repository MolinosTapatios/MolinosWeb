import { useCallback, useContext, useState } from 'react'
import Context from "../context/UserContext";
import Usuario from 'services/usuario';
import { useNavigate } from 'react-router-dom';

function useUser() {

    const { jwt, setJWT } = useContext(Context)
    const [estado, setEstado] = useState({ error: null, loading: false })
    const navigate = useNavigate()

    const login = useCallback(({ username, password }) => {
        setEstado({ loading: true, error: null })
        const u = new Usuario({username:username, password:password})
        u.login(u)
            .then(resp => {
                if (resp.error) {
                    setEstado({loading:false, error:resp.error})
                }else{
                    window.localStorage.setItem("active", JSON.stringify(resp));
                    setJWT({jwt:resp.token,tipo:resp.tipo})
                    setEstado({loading:false, error:'Verificacion Exitosa'})
                }
            })
            .catch(err => {
                setEstado({ loading: false, error: "Error en el servidor" })
            })
    }, [setJWT])

    const logout = useCallback(() => {
        const u = new Usuario({})
        u.logout({token:jwt.jwt})
        setJWT({jwt:null, tipo:null})
        localStorage.removeItem("active")
        navigate('/')
    }, [setJWT, navigate, jwt])

    return {
        isLogged: Boolean(jwt.jwt),
        login,
        loading: estado.loading,
        error: estado.error,
        logout,
        user : jwt
    }
}

export default useUser