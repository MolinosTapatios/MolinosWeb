// import { useState } from "react";
// import { useState } from "react";
import URL from "../config.js"


//Registro de producto
const postData = async (data) => {
    const response = await fetch(URL.URL + "registrarProducto.php", {
        method: 'POST',
        body: JSON.stringify(data),
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const json = await response.json();
    return json;
}

async function Registrar(params) {

    const respons = {
        "flag":"",
        "msg":""
    }
    
    try {
        const registrar = await postData(params)
        // console.log(registrar);
        respons.flag = registrar.flag
        respons.msg = registrar.msg
    } catch (e) {
        respons.flag = false;
        respons.msg = "Error en el catch "+e
    }
    return(respons)
}

export {Registrar};