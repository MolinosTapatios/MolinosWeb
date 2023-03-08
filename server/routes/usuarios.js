import express from "express"
import * as usuariosServices from '../services/usuarios.js'

const router = express.Router()

router.post('/', async (_req, res) => {
  console.log({ body: _req.body })
  try {
    const results = await usuariosServices.validarUsuario(_req.body)
    res.send(results)
  } catch (error) {
    res.status(500).send('Ha ocurrido un error en el servidor')
  }
})

export default router