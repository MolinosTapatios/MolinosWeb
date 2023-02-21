import React from "react";
import { URL } from "./config";

const fromAjaxResponseToProduct = response => {
    if (Array.isArray(response)) {
        return response
    }
    return []
}

function getSingleProduct({id}={}) {
    const URL = `${URL}/ajax_getProducto.php`

    fetch(URL, {
        body: JSON.stringify({ "id": id }),
        method: "POST"
    })
        .then(resp => resp.json())
        .then(fromAjaxResponseToProduct)
}