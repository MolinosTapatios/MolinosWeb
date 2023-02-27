import { URL } from "./config.js";

const fromAjaxResponseToProduct = response => {
    return response
}

export default function updateProduct({formdata} = {}) {

    const ajaxURL = `${URL}/ajax_editarProducto.php`

    return fetch(ajaxURL, {
        body: formdata,
        method: "POST"
    })
        .then(resp => resp.json())
        .then(fromAjaxResponseToProduct)
}