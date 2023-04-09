import React, { useEffect } from "react";
import { useHref } from "react-router-dom";
import Nav from '../Nav'
import useUser from "../../hooks/useUser";

function Header({ acceder }) {
    const href = useHref()
    const { isLogged, } = useUser()

    useEffect(() => {
        acceder(isLogged)
    }, [isLogged, acceder])

    return (
        <>
            {
                (
                    href.toLowerCase() !== "/login".toLowerCase() &&
                    href.toLowerCase() !== "/404".toLowerCase() &&
                    href.toLowerCase() !== "/registrousuario".toLowerCase()
                ) && <Nav />
            }
        </>
    )
}

export default Header