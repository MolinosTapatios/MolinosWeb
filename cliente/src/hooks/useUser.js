import { useCallback, useContext, useState } from 'react'
import Context from "../context/UserContext";
import Usuario from 'services/usuario';

function useUser() {

    const { jwt, setJWT } = useContext(Context)
    const [estado, setEstado] = useState({ error: null, loading: false })

    const login = useCallback(({ username, password }) => {
        setEstado({ loading: true, error: null })
        const u = new Usuario({username:username, password:password})
        u.login(u)
            .then(resp => {
                if (resp.flag) {
                        window.sessionStorage.setItem("active", JSON.stringify(resp));
                        setJWT({id:resp.id,tipo:resp.tipo})
                }else{
                    setEstado({loading:false, error:'Error al consultar'})
                }
                // setEstado({loading:false})
            })
            .catch(err => {
                setEstado({ loading: false, error: "Error en el servidor" })
            })
    }, [setJWT])

    const logout = useCallback(() => {
        setJWT(null)
        sessionStorage.removeItem("active")
    }, [setJWT])

    return {
        isLogged: Boolean(jwt),
        login,
        loading: estado.loading,
        error: estado.error,
        logout,
        user : jwt
    }
}

export default useUser