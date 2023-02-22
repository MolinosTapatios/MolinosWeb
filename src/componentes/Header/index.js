import React, { useEffect } from "react";
import Nav from '../Nav'
import useUser from "../../hooks/useUser";
import { useHref } from "react-router-dom";

function Header({acceder}) {
    // const isLoged = false
    const href = useHref()
    const { isLogged, } = useUser()

    // console.log(href)
    
    useEffect(()=>{
        acceder(isLogged)
    },[isLogged,acceder])

    return (
        <>
            {
                isLogged 
                ?
                    "/todos_productos" === href || "/"===href || "/registrarPr"===href ? <Nav /> : ""
                : "/" === href ? <Nav /> : ""
                
            }
            {/* {"/todos_productos"===href || "/"===href || "/registrarPr"===href
                ?<Nav />
                :""
            } */}
        </>
    )
}

export default Header