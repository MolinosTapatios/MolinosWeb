import {URL} from './config.js'

const fromAjaxResponseToProducts = response => {
    if (Array.isArray(response)) {
    return response
  }
  return []
}

export default function getProducts() {
  const apiURL = `${URL}/ajaxProductos.php`

  return fetch(apiURL)
    .then((res) => res.json())
    .then(fromAjaxResponseToProducts)
}