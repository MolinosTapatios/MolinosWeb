import dotenv from 'dotenv'
import express from "express"
import userExtractor from '../middleware/userExtractor.js';
import * as productoServices from '../services/producto.js'
dotenv.config();

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

router.get('/:tipo/:limit', async (_req, res) => {
  try {
    const results = await productoServices.getHome({ tipo: _req.params.tipo, limit: _req.params.limit })
    res.send(results)
  } catch (error) {
    console.error(error)
    res.status(500).send('Ha ocurrido un error en el servidor')
  }
})

router.post('/', async (_req, res) => {
  try {
    const results = await productoServices.crearProducto(_req.body)
    res.send(results)
  } catch (error) {
    console.error(error)
    res.status(500).send('Ha ocurrido un error en el servidor')
  }
})

export default router