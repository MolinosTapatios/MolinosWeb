import express from "express"
import * as productoServices from '../services/producto.js'

const router = express.Router()

router.get('/', async (_req, res) => {
    try {
      const results = await productoServices.getAll()
      res.send(results)
    } catch (error) {
      console.error(error)
      res.status(500).send('Ha ocurrido un error en el servidor')
    }
  })

export default router