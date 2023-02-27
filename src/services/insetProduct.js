import { URL } from "./config.js"

//Registro de producto
const postData = respons => {
    return respons
}

function Registrar({ formdata } = {}) {

    return fetch(`${URL}/registrarProducto.php`, {
        method: 'POST',
        body: formdata,
    })
        .then(res => res.json())
        .then(postData)
}

export default Registrar;