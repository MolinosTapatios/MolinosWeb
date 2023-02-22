import {URL} from "./config.js"

const fromAjaxResponseInput = response => {
    return response
}

function inputImages({formdata}={}) {

    return fetch(`${URL}/guardarImg.php`, {
        method: "POST",
        body: formdata
    })
        .then(res => res.json)
        .then(fromAjaxResponseInput)
}

export default inputImages