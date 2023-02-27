import { URL } from './config.js'

const fromAjaxResponseToProducts = response => {
  if (Array.isArray(response)) {
    return response
  }
  return []
}

export default function getProducts({ tipo, limit, status }) {

  const ajaxURL = `${URL}/ajaxProductos.php`

  return fetch(ajaxURL, {
    body: JSON.stringify({
      producto_tipo: tipo,
      producto_status: status,
      productos_limit: limit,
    }),
    method: 'POST'
  })
    .then((res) => res.json())
    .then(fromAjaxResponseToProducts)
}