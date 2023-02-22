import { URL } from "./config.js";

const posData = response => {
        return response
}

export default function login({ user, password } = {}) {
    const ajaxURL = `${URL}/validar_user.php`

    return fetch(ajaxURL, {
        body: JSON.stringify({ "user":user, "password":password }),// body data type must match "Content-Type" header
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        // mode: 'cors', // no-cors, *cors, same-origin
        // cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: 'include', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            // 'Access-Control-Allow-Origin':'*' 
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        // redirect: 'follow', // manual, *follow, error
        // referrerPolicy: 'origin-when-cross-origin' // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        
    })
        .then(resp => resp.json())
        .then(posData)
}