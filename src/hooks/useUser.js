import { useCallback, useContext, useState } from 'react'
import Context from "../context/UserContext";
import loginService from 'services/login';

function useUser() {

    const { jwt, setJWT } = useContext(Context)
    const [estado, setEstado] = useState({ error: null, loading: false })

    const login = useCallback(({ username, password }) => {
        setEstado({ loading: true, error: null })
        loginService({ user: username, password: password })
            .then(resp => {
                if (resp) {
                    if (resp.flag) {
                        window.sessionStorage.setItem("active", JSON.stringify(resp));
                        setJWT(resp)
                        setEstado({ loading: false, error: "" })
                    } else {
                        setEstado({ loading: false, error: resp.msg })
                    }
                }
            })
            .catch(err => {
                setEstado({ loading: false, error: "Error en el servidor" })
            })
    }, [setJWT])

    const logout = useCallback(() => {
        setJWT(null)
    }, [setJWT])

    return {
        isLogged: Boolean(jwt),
        login,
        loading: estado.loading,
        error: estado.error,
        logout
    }
}

export default useUser