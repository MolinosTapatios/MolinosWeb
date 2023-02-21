import {URL} from './config.js'

const fromAjaxResponseToProducts = response => {
    if (Array.isArray(response)) {
    return response
  }
  return []
}

export default function getProducts() {
  const URL = `${URL}/ajaxProductos.php`

  return fetch(URL)
    .then((res) => res.json())
    .then(fromAjaxResponseToProducts)
}