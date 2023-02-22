import {URL} from './config.js'

const fromAjaxResponseToProducts = response => {
    if (Array.isArray(response)) {
    return response
  }
  return []
}

export default function getProducts() {
  const ajaxURL = `${URL}/ajaxProductos.php`

  return fetch(ajaxURL)
    .then((res) => res.json())
    .then(fromAjaxResponseToProducts)
}