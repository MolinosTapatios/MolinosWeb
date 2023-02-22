import { URL } from './config.js'

const fromAjaxResponseRemove = response => {
  return response
}

export default function removeProduct({ id } = {}) {
  const apiURL = `${URL}/ajax_eliminarProducto.php`

  return fetch(apiURL, {
    body: JSON.stringify({ "id": id }),
    method: "POST"
  })
    .then((res) => res.json())
    .then(fromAjaxResponseRemove)
}