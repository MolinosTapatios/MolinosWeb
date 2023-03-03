import { URL } from "./config"

const fromAjaxRespons = resp => {
    return resp
}

function deleteImg({id}) {
    const apiURL = `${URL}/deleteImage.php`
    
    return fetch(apiURL, {
        method: 'POST',
        body:JSON.stringify({id:id})
    })
    .then(response => response.json())
    .then(fromAjaxRespons)
}

export default deleteImg