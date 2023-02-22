import { URL } from "./config.js";

const fromAjaxResponseToProduct = response => {
        return response
}

export default function getSingleProduct({ id } = {}) {
    const ajaxURL = `${URL}/ajax_getProducto.php`

    return fetch(ajaxURL, {
        body: JSON.stringify({ "id": id }),
        method: "POST"
    })
        .then(resp => resp.json())
        .then(fromAjaxResponseToProduct)
}