import { URL } from "./config"

const fromAjaxResponse = response => {
    return response
}

function getCarrito({ user_id }) {

    const apiURL = `${URL}/ajax_getCarrito.php`

    return fetch(apiURL, {
        method: "POST",
        body: JSON.stringify({ user_id:user_id })
    })
        .then(resp => resp.json())
        .then(fromAjaxResponse)
}

export default getCarrito