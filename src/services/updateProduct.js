import { URL } from "./config.js";

const fromAjaxResponseToProduct = response => {
    return response
}

export default function updateProduct({
    id,
    nombre,
    precio,
    stock,
    descricripcion,
    caracteristicas,
    status,
    tipo } = {}) {

    const ajaxURL = `${URL}/ajax_editarProducto.php`

    return fetch(ajaxURL, {
        body: JSON.stringify({
            "id": id,
            "nombre": nombre,
            "precio": precio,
            "stock": stock,
            "descripcion": descricripcion,
            "caracteristicas": caracteristicas,
            "status": status,
            "tipo": tipo
        }),
        method: "POST"
    })
        .then(resp => resp.json())
        .then(fromAjaxResponseToProduct)
}