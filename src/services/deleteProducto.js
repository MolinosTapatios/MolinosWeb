import { URL } from "./config"

const fromAjaxResponse = (response) => {
    return response
}

function deleteProduct({ user_id, producto_id }) {

    const apiURL = `${URL}/ajax_deleteProductOfCart.php`

    return fetch(apiURL, {
        method: "POST",
        body: JSON.stringify({
            user_id: user_id,
            producto_id: producto_id
        })
    })
        .then(resp => resp.json())
        .then(fromAjaxResponse)
}

export default deleteProduct