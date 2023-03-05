import React, { /* useEffect */ useCallback, useState } from "react"
import { Producto } from "services/producto"


function Tortilladoras(params) {
    
    const [estado,setEstado] = useState({loading:false,error:false, msg:"Nada por aqui"})
    
    const enviar = useCallback(() => {
        setEstado({error:false,loading:true})
        const p = new Producto({nombre:"Molino de piedras", tipo:1})
        p.pruebas(p)
        .then(respons => {
        })
        .catch(e=>setEstado({error:true,loading:false,msg:e}))
    },[])

    return(
        <>
            <div style={{backgroundColor:"white"}}>
                <button onClick={enviar}>Enviar</button>
                <div>{estado.msg}</div>
            </div>
        </>
    )
}

export default Tortilladoras