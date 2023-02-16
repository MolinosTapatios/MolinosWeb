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
        if(registrar.flag){
            respons.flag = true
            respons.msg = registrar.msg
        }else{
            respons.flag = false
            respons.msg = registrar.msg.errorInfo[2]
        }
    } catch (e) {
        respons.flag = false;
        respons.msg = "Error en el catch "+e
    }
    return(respons)
}

export {Registrar};