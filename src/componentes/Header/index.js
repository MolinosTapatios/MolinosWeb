import React, { useEffect } from "react";
import Nav from '../Nav'
import useUser from "../../hooks/useUser";
import { useHref } from "react-router-dom";

function Header({acceder}) {
    const href = useHref()
    const { isLogged, } = useUser()

    // console.log("header")

    useEffect(()=>{
        acceder(isLogged)
    },[isLogged,acceder])

    return (
        <>
            {
                isLogged 
                ?
                    "/catalogo" === href || "/"===href || "/registrarPr"===href ? <Nav /> : ""
                : "/" === href ? <Nav /> : ""
                
            }
        </>
    )
}

export default Header