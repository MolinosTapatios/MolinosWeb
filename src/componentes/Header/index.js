import React, { useEffect } from "react";
import { useHref } from "react-router-dom";
import Nav from '../Nav'
import useUser from "../../hooks/useUser";

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
                    "/catalogo" === href || "/"===href || "/registrarPr"===href || "/tortilladoras"===href || "/carrito"===href ? <Nav /> : ""
                : "/" === href || "/tortilladoras"===href ? <Nav /> : ""
                
            }
        </>
    )
}

export default Header